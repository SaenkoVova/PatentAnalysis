import type { IMainWallet } from 'src/types/crypto/IMainWallet';

export interface IGetUserMainWalletsResponse {
  walletInfos: IMainWallet[];
  generalUsdValue: string;
  generalEurValueDec: number;
  generalEurValue: string;
  generalBtcValue: string;
  transferId: string;
}
