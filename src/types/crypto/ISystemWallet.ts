export interface ISystemWallet {
  currency: string;
  network: string;
  address: string;
  balance: number;
  usdEquivalent: number;
  eurEquivalent: number;
  native: boolean;
}
