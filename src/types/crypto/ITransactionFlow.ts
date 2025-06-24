import type { ITransaction } from 'src/types/crypto/ITransaction';

export interface ITransactionFlow {
  id: number;
  flowId: string;
  currentFlowType: string;
  currentFlowNumber: number;
  finished: boolean;
  hasError: boolean;
  transactions: ITransaction[];
}
