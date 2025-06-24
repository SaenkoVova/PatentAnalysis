export interface ICurrencyFee {
  id: number;
  created: number;
  currency: string;
  network: string;
  innerMinAmount: number;
  innerPercentByAmount: number;
  innerMaxAmount: number;
  externalMinAmount: number;
  externalPercentByAmount: number;
  externalMaxAmount: number;
  default: boolean;
}
