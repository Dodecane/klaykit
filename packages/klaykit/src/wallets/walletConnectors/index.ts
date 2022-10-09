import { argent } from './argent/argent';
import { brave } from './brave/brave';
import { coinbase } from './coinbase/coinbase';
import { imToken } from './imToken/imToken';
import { injected } from './injected/injected';
import { kaikas } from './kaikas/kaikas';
import { ledger } from './ledger/ledger';
import { metaMask } from './metaMask/metaMask';
import { omni, steak } from './omni/omni';
import { rainbow } from './rainbow/rainbow';
import { trust } from './trust/trust';
import { walletConnect } from './walletConnect/walletConnect';

export const wallet = {
  argent,
  brave,
  coinbase,
  imToken,
  injected,
  kaikas,
  ledger,
  metaMask,
  omni,

  rainbow,
  /** @deprecated */
  steak,
  trust,
  walletConnect,
};
