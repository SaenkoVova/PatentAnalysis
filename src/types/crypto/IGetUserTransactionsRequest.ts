import type { IPageableRequest } from 'src/types/common/IPageableRequest';

export interface IGetUserTransactionsRequest extends IPageableRequest {
  userId: string;
}
