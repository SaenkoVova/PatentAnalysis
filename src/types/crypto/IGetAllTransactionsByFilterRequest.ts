import type { IPageableRequest } from 'src/types/common/IPageableRequest';
import type { TransactionTypesEnum } from 'src/enums/crypto/TransactionTypesEnum';
import type { TransactionStatusesEnum } from 'src/enums/crypto/TransactionStatusesEnum';

export interface IGetAllTransactionsByFilterRequest extends IPageableRequest {
  type?: TransactionTypesEnum;
  status?: TransactionStatusesEnum;
  currency?: string;
  network?: string;
  hash?: string;
  fromAddress?: string;
  toAddress?: string;
  userId?: string;
}
