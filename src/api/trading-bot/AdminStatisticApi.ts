import { http } from 'boot/axios';
import type { IGetStatisticResponse } from 'src/types/ai-trading/IGetStatisticResponse';
import type { IGetStatisticWithdrawRequest } from 'src/types/ai-trading/IGetStatisticWithdrawRequest';
import type { IGetStatisticWithdrawResponse } from 'src/types/ai-trading/IGetStatisticWithdrawResponse';

export const getStatistic = async (): Promise<IGetStatisticResponse> =>
  (await http.get('/trading-bot/admin/statistic')).data;

export const getStatisticWithdraw = async (
  payload: IGetStatisticWithdrawRequest,
): Promise<IGetStatisticWithdrawResponse> =>
  (await http.post('/trading-bot/admin/statistic/withdraw', payload)).data;
