import type { ICreateMonthProfitRequest } from 'src/types/ai-trading/ICreateMonthProfitRequest';

export interface ICreateMonthProfitPersonalRequest {
  accountId: string;
  data: ICreateMonthProfitRequest;
}
