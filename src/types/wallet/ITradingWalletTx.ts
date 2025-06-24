import type { TransactionTypesEnum } from 'src/enums/wallet/TransactionTypesEnum';

export interface ITradingWalletTx {
  id: number;
  requestId: string;
  created: string;
  type: TransactionTypesEnum;
  balanceBefore: number;
  balanceAfter: number;
}
