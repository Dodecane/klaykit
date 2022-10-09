import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';

export const Cypress: Chain = {
  blockExplorers: {
    default: { name: 'Klaytn Scope', url: 'https://scope.klaytn.com' },
  },
  iconBackground: '#fff',
  iconUrl: async () => (await import('./klay.svg')).default,
  id: 8217,
  name: 'Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Klaytn',
    symbol: 'KLAY',
  },
  network: 'cypress',
  rpcUrls: {
    default: 'https://public-node-api.klaytnapi.com/v1/cypress',
  },
  testnet: false,
};

export const Baobab: Chain = {
  blockExplorers: {
    default: {
      name: 'Klaytn Scope (Baobab)',
      url: 'https://baobab.scope.klaytn.com',
    },
  },
  iconBackground: '#fff',
  iconUrl: async () => (await import('./klay.svg')).default,
  id: 1001,
  name: 'Baobab Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Klaytn',
    symbol: 'KLAY',
  },
  network: 'baobab',
  rpcUrls: {
    default: 'https://api.baobab.klaytn.net:8651/',
  },
  testnet: true,
};
