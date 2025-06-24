export interface ITradingWallet {
  balance: number;
  ordersLockedBalance: number;
  btcValue: number;
  usdValue: number;
  eurValue: number;
  currencyName: string;
}
