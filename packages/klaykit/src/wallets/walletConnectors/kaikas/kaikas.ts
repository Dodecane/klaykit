/* eslint-disable sort-keys-fix/sort-keys-fix */
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
import { KaikasConnector } from './kaikasConnector';

export interface KaikasOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export const kaikas = ({ chains, shimDisconnect }: KaikasOptions): Wallet => ({
  id: 'kaikas',
  name: 'Kaikas',
  iconUrl: async () => (await import('./kaikas.svg')).default,
  iconBackground: '#fff',
  installed: typeof window !== 'undefined' && window.klaytn?.isKaikas === true,
  downloadUrls: {
    browserExtension:
      'https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi',
    android: 'https://play.google.com/store/apps/details?id=io.klutch.wallet',
    ios: 'https://apps.apple.com/app/kaikas-mobile-crypto-wallet/id1626107061',
    qrCode:
      'https://kaikas.zendesk.com/hc/en-us/articles/10915901333913-How-do-I-install-Mobile-Kaikas-',
  },
  createConnector: () => ({
    connector: new KaikasConnector({
      chains,
      options: { shimDisconnect },
    }),
  }),
});
