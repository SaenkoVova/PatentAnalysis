import { http } from 'boot/axios';
import type { ILevelSetting } from 'src/types/referral/ILevelSetting';
import type { IUpdateLevelSettingRequest } from 'src/types/referral/IUpdateLevelSettingRequest';
import type { ICreateLevelSettingRequest } from 'src/types/referral/ICreateLevelSettingRequest';

export const getLevelSettings = async (): Promise<ILevelSetting[]> =>
  (await http.get('/referral/admin/level-settings')).data;

export const updateLevelSetting = async (payload: IUpdateLevelSettingRequest): Promise<void> =>
  (await http.put(`/referral/admin/level-settings/${payload.id}`, payload)).data;

export const createLevelSetting = async (payload: ICreateLevelSettingRequest): Promise<void> =>
  (await http.post('/referral/admin/level-settings', payload)).data;
