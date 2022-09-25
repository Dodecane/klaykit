import { providers } from 'ethers'
import { getAddress} from 'ethers/lib/utils.js'

import {
  ConnectorNotFoundError,
  ProviderRpcError,
  ResourceUnavailableError,
  RpcError,
  UserRejectedRequestError,
} from 'wagmi'
import { Chain } from 'wagmi'
import { normalizeChainId } from '@wagmi/core'
import { Connector } from 'wagmi'

export type KaikasConnectorOptions = {
  /** Name of connector */
  name?: string | ((detectedName: string | string[]) => string)
  /**
   * MetaMask 10.9.3 emits disconnect event when chain is changed.
   * This flag prevents the `"disconnect"` event from being emitted upon switching chains.
   * @see https://github.com/MetaMask/metamask-extension/issues/13375#issuecomment-1027663334
   */
  shimChainChangedDisconnect?: boolean
  /**
   * MetaMask and other injected providers do not support programmatic disconnect.
   * This flag simulates the disconnect behavior by keeping track of connection status in storage.
   * @see https://github.com/MetaMask/metamask-extension/issues/10353
   * @default true
   */
  shimDisconnect?: boolean
}

export class KaikasConnector extends Connector<
  Window['klaytn'],
  KaikasConnectorOptions | undefined,
  providers.JsonRpcSigner
> {
  readonly id: string
  readonly name: string
  readonly ready = typeof window != 'undefined' && !!window.klaytn

  #provider?: Window['klaytn']
  #switchingChains?: boolean

  protected shimDisconnectKey = 'kaikas.shimDisconnect'

  constructor({
    chains,
    options = { shimDisconnect: true },
  }: {
    chains?: Chain[]
    options?: KaikasConnectorOptions
  } = {}) {
    super({ chains, options })

    this.id = 'kaikas'
    this.name = 'Kaikas'
  }

  async connect({ chainId }: { chainId?: number } = {}) {
    try {
      const provider = await this.getProvider()
      if (!provider) throw new ConnectorNotFoundError()

      if (provider.on) {
        provider.on('accountsChanged', this.onAccountsChanged)
        provider.on('networkChanged', this.onChainChanged)
        provider.on('disconnect', this.onDisconnect)
      }

      this.emit('message', { type: 'connecting' })

      const account = await this.getAccount()
      let id = await this.getChainId()
      let unsupported = this.isChainUnsupported(id)

      // Add shim to storage signalling wallet is connected
      if (this.options?.shimDisconnect)
        getClient().storage?.setItem(this.shimDisconnectKey, true)

      return { account, chain: { id, unsupported }, provider }
    } catch (error) {
      if (this.isUserRejectedRequestError(error))
        throw new UserRejectedRequestError(error)
      if ((<RpcError>error).code === -32002)
        throw new ResourceUnavailableError(error)
      throw error
    }
  }

  async disconnect() {
    const provider = await this.getProvider()
    if (!provider?.removeListener) return

    provider.removeListener('accountsChanged', this.onAccountsChanged)
    provider.removeListener('networkChanged', this.onChainChanged)
    provider.removeListener('disconnect', this.onDisconnect)

    // Remove shim signalling wallet is disconnected
    if (this.options?.shimDisconnect)
      getClient().storage?.removeItem(this.shimDisconnectKey)
  }

  async getAccount() {
    const provider = await this.getProvider()
    if (!provider) throw new ConnectorNotFoundError()
    const accounts = await provider.enable()
    // return checksum address
    return getAddress(<string>accounts[0])
  }

  async getChainId() {
    const provider = await this.getProvider()
    if (!provider) throw new ConnectorNotFoundError()
    return await provider.networkVersion
  }

  async getProvider() {
    if (typeof window !== 'undefined' && !!window.klaytn)
      this.#provider = window.klaytn
    return this.#provider
  }

  async getSigner({ chainId }: { chainId?: number } = {}) {
    const [provider, account] = await Promise.all([
      this.getProvider(),
      this.getAccount(),
    ])
    return new providers.Web3Provider(
      <providers.ExternalProvider>provider,
      chainId,
    ).getSigner(account)
  }

  async isAuthorized() {
    try {
      if (
        this.options?.shimDisconnect &&
        // If shim does not exist in storage, wallet is disconnected
        !getClient().storage?.getItem(this.shimDisconnectKey)
      )
        return false

      const provider = await this.getProvider()
      if (!provider) throw new ConnectorNotFoundError()
      const accounts = await new Promise<string[]>((resolve, reject) => {
        provider.sendAsync({
            method: 'klay_accounts',
          },
          (error, result) => {
            resolve(result.result)
          },
        )
      })
      const account = accounts[0]
      return !!account
    } catch {
      return false
    }
  }

  async switchChain(chainId: number) : Promise<never> {
    alert("Programmatic network switching is unsupported, please switch networks manually in Kaikas")
    throw new UserRejectedRequestError("unsupported operation")
  }

  async watchAsset({
    address,
    decimals = 18,
    image,
    symbol,
  }: {
    address: string
    decimals?: number
    image?: string
    symbol: string
  }) {
    const provider = await this.getProvider()
    if (!provider) throw new ConnectorNotFoundError()
    return await new Promise<boolean>((resolve, reject) => {
      provider.sendAsync({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address,
            decimals,
            image,
            symbol,
          },
        },
      },
        (error, result) => {
          resolve(result.result)
        },
      )
    })
  }

  protected onAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) this.emit('disconnect')
    else this.emit('change', { account: getAddress(<string>accounts[0]) })
  }

  protected onChainChanged = (chainId: number | string) => {
    const id = normalizeChainId(chainId)
    const unsupported = this.isChainUnsupported(id)
    this.emit('change', { chain: { id, unsupported } })
  }

  protected onDisconnect = () => {
    // We need this as MetaMask can emit the "disconnect" event
    // upon switching chains. This workaround ensures that the
    // user currently isn't in the process of switching chains.
    if (this.options?.shimChainChangedDisconnect && this.#switchingChains) {
      this.#switchingChains = false
      return
    }

    this.emit('disconnect')
    // Remove shim signalling wallet is disconnected
    if (this.options?.shimDisconnect)
      getClient().storage?.removeItem(this.shimDisconnectKey)
  }

  protected isUserRejectedRequestError(error: unknown) {
    return (<ProviderRpcError>error).code === 4001
  }
}

import { Provider, WebSocketProvider } from '@wagmi/core'
import { Client } from '@wagmi/core'

export let client: Client<Provider, WebSocketProvider>

export function getClient<
  TProvider extends Provider = Provider,
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
>() {
  if (!client) {
    throw new Error(
      'No wagmi client found. Ensure you have set up a client: https://wagmi.sh/docs/client',
    )
  }
  return client as unknown as Client<TProvider, TWebSocketProvider>
}