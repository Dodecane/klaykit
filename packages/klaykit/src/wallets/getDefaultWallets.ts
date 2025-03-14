import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';
import { WalletList } from './Wallet';
import { connectorsForWallets } from './connectorsForWallets';
import { brave } from './walletConnectors/brave/brave';
import { injected } from './walletConnectors/injected/injected';
import { kaikas } from './walletConnectors/kaikas/kaikas';
import { metaMask } from './walletConnectors/metaMask/metaMask';
import { walletConnect } from './walletConnectors/walletConnect/walletConnect';

export const getDefaultWallets = ({
  chains,
}: {
  chains: Chain[];
}): {
  connectors: ReturnType<typeof connectorsForWallets>;
  wallets: WalletList;
} => {
  const wallets: WalletList = [
    {
      groupName: 'Recommended',
      wallets: [kaikas({ chains })],
    },
    {
      groupName: 'Others',
      wallets: [
        metaMask({ chains }),
        brave({ chains }),
        injected({ chains }),
        walletConnect({ chains }),
      ],
    },
  ];

  return {
    connectors: connectorsForWallets(wallets),
    wallets,
  };
};
