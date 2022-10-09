import './polyfills';
import './global.css';
import 'klaykit/styles.css';
import {
  Baobab,
  Cypress,
  getDefaultWallets,
  RainbowKitProvider,
} from 'klaykit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import App from './App';

const { chains, provider, webSocketProvider } = configureChains(
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
