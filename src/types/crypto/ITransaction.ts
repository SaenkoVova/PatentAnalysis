import type { TransactionTypesEnum } from 'src/enums/crypto/TransactionTypesEnum';

export interface ITransaction {
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
  type: TransactionTypesEnum;
  userId: string;
  usdValue: string;
  eurValue: string;
  description: string;
}
