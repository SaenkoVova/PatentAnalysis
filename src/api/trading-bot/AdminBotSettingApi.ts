import { http } from 'boot/axios';
import type { IUpdateBotSettingRequest } from 'src/types/ai-trading/IUpdateBotSettingRequest';
import type { IUpdateAlgorithmRequest } from 'src/types/ai-trading/IUpdateAlgorithmRequest';
import type { IAlgorithmTune } from 'src/types/ai-trading/IAlgorithmTune';

export const updateBotSetting = async (val: IUpdateBotSettingRequest): Promise<void> =>
  (await http.put('/trading-bot/admin/manage/bot-setting', val)).data;

export const getAlgorithmTuning = async (): Promise<IAlgorithmTune[]> =>
  (await http.get('/trading-bot/admin/manage/algorithm-tuning')).data;

export const updateAlgorithm = async (val: IUpdateAlgorithmRequest): Promise<void> =>
  (await http.put('/trading-bot/admin/manage/algorithm-tuning', val)).data;
