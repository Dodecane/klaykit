/* eslint-disable sort-keys-fix/sort-keys-fix */
import { KaikasConnector } from './kaikasConnector';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface KaikasOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export const kaikas = ({ chains, shimDisconnect }: KaikasOptions): Wallet => ({
  id: 'kaikas',
  name: 'Kaikas',
  iconUrl: async () => (await import('./kaikas.svg')).default,
  iconBackground: '#fff',
  installed:
    typeof window !== 'undefined' && window.klaytn?.isKaikas === true,
  downloadUrls: {
    browserExtension:
    'https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi',
  },
  createConnector: () => ({
    connector: new KaikasConnector({
      chains,
      options: { shimDisconnect },
    }),
  }),
});
