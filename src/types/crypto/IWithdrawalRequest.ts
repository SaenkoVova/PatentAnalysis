export interface IWithdrawalRequest {
  id: number;
  hash: string;
  created: number;
  fromAddress: string;
  toAddress: string;
  currency: string;
  amount: number;
  fee: number;
  status: string;
  network: string;
  type: string;
  userId: string;
  usdValue: string;
  eurValue: string;
  description: string;
}
