import { http } from 'boot/axios';
import type { IPageableResponse } from 'src/types/common/IPageableResponse';
import type { IPageableRequest } from 'src/types/common/IPageableRequest';
import type { IPairSetting } from 'src/types/pair/IPairSetting';
import type { ICurrency } from 'src/types/pair/ICurrency';

export const getPairsSettings = async (
  params: IPageableRequest,
): Promise<IPageableResponse<IPairSetting>> =>
  (await http.get('/pair/pair-settings/pairs', { params })).data;

export const getCurrencies = async (
  params: IPageableRequest,
): Promise<IPageableResponse<ICurrency>> =>
  (await http.get('/pair/pair-settings/currencies', { params })).data;

export const managePair = async (payload: IPairSetting): Promise<void> =>
  (await http.post('/pair/pair-settings/pair', payload)).data;

export const manageCurrency = async (payload: ICurrency): Promise<void> =>
  (await http.put('/pair/pair-settings/currency', payload)).data;
