import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';

export const Cypress : Chain = {
    id: 8217,
    name: 'Mainnet',
    network: 'cypress',
    iconUrl: async () => (await import('./klay.svg')).default,
    iconBackground: '#fff',
    nativeCurrency: {
      decimals: 18,
      name: 'Klaytn',
      symbol: 'KLAY',
    },
    rpcUrls: {
      default: 'https://public-node-api.klaytnapi.com/v1/cypress',
    },
    blockExplorers: {
      default: { name: 'Klaytn Scope', url: 'https://scope.klaytn.com' },
    },
    testnet: false,
};

export const Baobab : Chain = {
    id: 1001,
    name: 'Baobab Testnet',
    network: 'baobab',
    iconUrl: async () => (await import('./klay.svg')).default,
    iconBackground: '#fff',
    nativeCurrency: {
      decimals: 18,
      name: 'Klaytn',
      symbol: 'KLAY',
    },
    rpcUrls: {
      default: 'https://api.baobab.klaytn.net:8651/',
    },
    blockExplorers: {
      default: { name: 'Klaytn Scope (Baobab)', url: 'https://baobab.scope.klaytn.com' },
    },
    testnet: true,
};