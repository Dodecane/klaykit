import { Baobab, Cypress, getDefaultWallets } from 'klaykit';
import React from 'react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

export const { chains, provider } = configureChains(
  [Cypress, Baobab],
  [jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default }) })]
);

const { connectors } = getDefaultWallets({
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export function Provider({ children }) {
  return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>;
}
