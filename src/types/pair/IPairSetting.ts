export interface IPairSetting {
  pairName: string;
  currencyFirst: string;
  currencySecond: string;
  scale: number;
  takerFeePercent: number;
  makerFeePercent: number;
  minimumTrade: number;
  active: boolean;
  tradingBotPointChart: boolean;
}
