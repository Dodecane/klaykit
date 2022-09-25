import { Signer as BaseSigner, providers } from 'ethers'

import {
  BlockExplorer,
  BlockExplorerName,
  RpcProviderName,
  units,
} from '@wagmi/core/dist/declarations/src/constants'

export type Address = `0x${string}`
export type Hash = `0x${string}`

export type Chain = {
  /** ID in number form */
  id: number
  /** Human-readable name */
  name: string
  /** Internal network name */
  network: string
  /** Currency used by chain */
  nativeCurrency?: AddEthereumChainParameter['nativeCurrency']
  /** Collection of RPC endpoints */
  rpcUrls: { [key in RpcProviderName]?: string } & {
    [key: string]: string
    default: string
  }
  /** Collection of block explorers */
  blockExplorers?: {
    [key in BlockExplorerName]?: BlockExplorer
  } & {
    [key: string]: BlockExplorer
    default: BlockExplorer
  }
  /** ENS registry */
  ens?: {
    address: string
  }
  /** Chain multicall contract */
  multicall?: {
    address: string
    blockCreated: number
  }
  /** Flag for test networks */
  testnet?: boolean
}

export type ChainProviderFn<
  TProvider extends Provider = providers.BaseProvider,
  TWebSocketProvider extends WebSocketProvider = providers.WebSocketProvider,
  TChain extends Chain = Chain,
> = (chain: TChain) => {
  chain: TChain
  provider: () => ProviderWithFallbackConfig<TProvider>
  webSocketProvider?: () => TWebSocketProvider
} | null

export type FallbackProviderConfig = Omit<
  providers.FallbackProviderConfig,
  'provider'
>
export type ProviderWithFallbackConfig<TProvider extends Provider = Provider> =
  TProvider & FallbackProviderConfig

export type Provider = providers.BaseProvider & { chains?: Chain[] }
export type WebSocketProvider = providers.WebSocketProvider & {
  chains?: Chain[]
}

export type Signer = BaseSigner

export type Unit = typeof units[number]

type AddEthereumChainParameter = {
  /** A 0x-prefixed hexadecimal string */
  chainId: string
  chainName: string
  nativeCurrency?: {
    name: string
    /** 2-6 characters long */
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls?: string[]
  /** Currently ignored. */
  iconUrls?: string[]
}

type WalletPermissionCaveat = {
  type: string
  value: any
}

type WalletPermission = {
  caveats: WalletPermissionCaveat[]
  date: number
  id: string
  invoker: `http://${string}` | `https://${string}`
  parentCapability: 'eth_accounts' | string
}

type WatchAssetParams = {
  /** In the future, other standards will be supported */
  type: 'ERC20'
  options: {
    /** Address of token contract */
    address: string
    /** Number of token decimals */
    decimals: number
    /** String url of token logo */
    image?: string
    /** A ticker symbol or shorthand, up to 5 characters */
    symbol: string
  }
}

type InjectedProviderFlags = {
  isBitKeep?: true
  isBraveWallet?: true
  isCoinbaseWallet?: true
  isExodus?: true
  isFrame?: true
  isMathWallet?: true
  isMetaMask?: true
  isOneInchAndroidWallet?: true
  isOneInchIOSWallet?: true
  isOpera?: true
  isTally?: true
  isTokenPocket?: true
  isTokenary?: true
  isTrust?: true
  isKaikas?: true
}

type InjectedProviders = InjectedProviderFlags & {
  isMetaMask: true
  /** Only exists in MetaMask as of 2022/04/03 */
  _events: {
    connect?: () => void
  }
  /** Only exists in MetaMask as of 2022/04/03 */
  _state?: {
    accounts?: string[]
    initialized?: boolean
    isConnected?: boolean
    isPermanentlyDisconnected?: boolean
    isUnlocked?: boolean
  }
}

export interface Klaytn extends InjectedProviders {
  on?: (...args: any[]) => void
  removeListener?: (...args: any[]) => void
  providers?: Klaytn[]

  /**
   * EIP-747: Add wallet_watchAsset to Provider
   * https://eips.ethereum.org/EIPS/eip-747
   */
  sendAsync(args: {
    method: 'wallet_watchAsset'
    params: WatchAssetParams
  },callback: (error: any, result: any) => void): undefined

  /**
   * EIP-1193: Ethereum Provider JavaScript API
   * https://eips.ethereum.org/EIPS/eip-1193
   */
  sendAsync(args: { method: 'klay_accounts' }, callback: (error: any, result: any) => void): undefined
  networkVersion: number
  enable(): Promise<string[]>

  /**
   * EIP-1474: Remote procedure call specification
   * https://eips.ethereum.org/EIPS/eip-1474
   */
  request(args: { method: 'web3_clientVersion' }): Promise<string>

  /**
   * EIP-2255: Wallet Permissions System
   * https://eips.ethereum.org/EIPS/eip-2255
   */
  request(args: {
    method: 'wallet_requestPermissions'
    params: [{ eth_accounts: Record<string, any> }]
  }): Promise<WalletPermission[]>
  request(args: {
    method: 'wallet_getPermissions'
  }): Promise<WalletPermission[]>

  /**
   * EIP-3085: Wallet Add Ethereum Chain RPC Method
   * https://eips.ethereum.org/EIPS/eip-3085
   */
  request(args: {
    method: 'wallet_addEthereumChain'
    params: AddEthereumChainParameter[]
  }): Promise<null>

  /**
   * EIP-3326: Wallet Switch Ethereum Chain RPC Method
   * https://eips.ethereum.org/EIPS/eip-3326
   */
  request(args: {
    method: 'wallet_switchEthereumChain'
    params: [{ chainId: string }]
  }): Promise<null>
}

declare global {
  interface Window {
    klaytn?: Klaytn
  }
}