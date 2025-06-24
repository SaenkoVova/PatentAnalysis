import type { ICreateLevelSettingRequest } from 'src/types/referral/ICreateLevelSettingRequest';

export interface IUpdateLevelSettingRequest extends ICreateLevelSettingRequest {
  id: string;
}
