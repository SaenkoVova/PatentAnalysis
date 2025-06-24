import type { IAddressInfo } from 'src/types/crypto/IAddressInfo';

export interface IMainWallet {
  currency: string;
  lockedBalance: string;
  totalBalance: string;
  balance: string;
  usdValue: string;
  eurValue: string;
  btcValue: string;
  addressInfos: IAddressInfo[];
}
