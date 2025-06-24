import { http } from 'boot/axios';
import type { IGetBotSettingsResponse } from 'src/types/game/IGetBotSettingsResponse';
import type { IChangeBotSettingsRequest } from 'src/types/game/IChangeBotSettingsRequest';
import type { IUserInfo } from 'src/types/game/IUserInfo';
import type { IPageableRequest } from 'src/types/common/IPageableRequest';
import type { IPageableResponse } from 'src/types/common/IPageableResponse';
import type { IBet } from 'src/types/game/IBet';

export const getBotSettings = async (): Promise<IGetBotSettingsResponse> =>
  (await http.get('/games/admin/bot/settings')).data;

export const changeBotSettings = async (payload: IChangeBotSettingsRequest): Promise<void> =>
  (await http.post('/games/admin/bot/settings/change', payload)).data;

export const getUserInfo = async (userId: string): Promise<IUserInfo> =>
  (await http.get('/games/admin/user/info', { params: { userId } })).data;

export const getUserBets = async (
  userId: string,
  params: IPageableRequest,
): Promise<IPageableResponse<IBet>> =>
  (await http.get('/games/admin/user/bets', { params: { ...params, userId } })).data;
