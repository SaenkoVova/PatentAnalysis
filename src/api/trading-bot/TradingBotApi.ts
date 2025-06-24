import { http } from 'boot/axios';
import type { IBotSetting } from 'src/types/ai-trading/IBotSetting';

export const getBotsSettings = async (): Promise<IBotSetting[]> =>
  (await http.get('/trading-bot/bot-settings')).data;

export const getCurrencies = async (): Promise<{ currency: string }[]> =>
  (await http.get('/trading-bot/currencies')).data;
