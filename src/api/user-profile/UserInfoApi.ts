import { http } from 'boot/axios';
import type { IProfileInfo } from 'src/types/user-profile/IProfileInfo';
import type { IGetProfileAvatarResponse } from 'src/types/user-profile/IGetProfileAvatarResponse';

export const getUserInfo = async (): Promise<IProfileInfo> =>
  (await http.get('/user-profile/profile/info')).data;

export const getUserAvatar = async (): Promise<IGetProfileAvatarResponse> =>
  (await http.get('/user-profile/profile/avatar')).data;
