import type { ITransaction } from 'src/types/crypto/ITransaction';
import type { ITransactionFlow } from 'src/types/crypto/ITransactionFlow';
import type { ITransactionUserInfo } from 'src/types/crypto/ITransactionUserInfo';

export interface ITransactionWithFlow {
  transaction: ITransaction;
  flow: ITransactionFlow;
  user: ITransactionUserInfo;
}
