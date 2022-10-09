type WatchAssetParams = {
  /** In the future, other standards will be supported */
  type: 'ERC20';
  options: {
    /** Address of token contract */
    address: string;
    /** Number of token decimals */
    decimals: number;
    /** String url of token logo */
    image?: string;
    /** A ticker symbol or shorthand, up to 5 characters */
    symbol: string;
  };
};

export interface Klaytn {
  isKaikas: boolean;
  on?: (...args: any[]) => void;
  removeListener?: (...args: any[]) => void;
  providers?: Klaytn[];
  sendAsync(
    args:
      | {
          method: 'wallet_watchAsset';
          params: WatchAssetParams;
        }
      | { method: 'klay_accounts' },
    callback: (error: any, result: any) => void
  ): void;
  networkVersion: number;
  enable(): Promise<string[]>;
}

declare global {
  interface Window {
    klaytn?: Klaytn;
    caver?: any;
  }
}
