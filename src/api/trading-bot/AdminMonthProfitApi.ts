import { http } from 'boot/axios';
import type { IMonthProfit } from 'src/types/ai-trading/IMonthProfit';
import type { ICreateMonthProfitRequest } from 'src/types/ai-trading/ICreateMonthProfitRequest';
import type { ICreateMonthProfitPersonalRequest } from 'src/types/ai-trading/ICreateMonthProfitPersonalRequest';

export const getMonthProfit = async (): Promise<IMonthProfit[]> =>
  (await http.get('/trading-bot/admin/month-profit')).data;

export const getMonthProfitPersonal = async (accountId: string): Promise<IMonthProfit[]> =>
  (await http.get(`/trading-bot/admin/month-profit/personal/${accountId}`)).data;

export const createMonthProfit = async (payload: ICreateMonthProfitRequest): Promise<void> =>
  (await http.post('/trading-bot/admin/month-profit', payload)).data;

export const createMonthProfitPersonal = async (
  payload: ICreateMonthProfitPersonalRequest,
): Promise<void> =>
  (await http.post(`/trading-bot/admin/month-profit/personal/${payload.accountId}`, payload.data))
    .data;
