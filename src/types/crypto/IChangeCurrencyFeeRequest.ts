export interface IChangeCurrencyFeeRequest {
  currency: string;
  network: string;
  internalMinAmount: number;
  internalMaxAmount: number;
  internalPercentByAmount: number;
  externalMinAmount: number;
  externalMaxAmount: number;
  externalPercentByAmount: number;
}
