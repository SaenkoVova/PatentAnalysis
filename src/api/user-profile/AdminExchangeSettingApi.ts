import { http } from 'boot/axios';
import type { IExchangeSettings } from 'src/types/user-profile/IExchangeSettings';

export const getExchangeSettings = async (): Promise<IExchangeSettings> =>
  (await http.get('/user-profile/admin/exchange-settings')).data;

export const updateExchangeSettings = async (val: IExchangeSettings): Promise<void> =>
  (await http.put('/user-profile/admin/exchange-settings', val)).data;
