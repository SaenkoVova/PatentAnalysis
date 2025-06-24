import { http } from 'boot/axios';
import type { IPageableRequest } from 'src/types/common/IPageableRequest';
import type { IPageableResponse } from 'src/types/common/IPageableResponse';
import type { IUser } from 'src/types/user-profile/IUser';
import type { IGetAvatarResponse } from 'src/types/user-profile/IGetAvatarResponse';
import type { IUpdateUserRoleRequest } from 'src/types/user-profile/IUpdateUserRoleRequest';
import type { ILoginHistory } from 'src/types/user-profile/ILoginHistory';

export const getLoginHistory = async (
  userId: string,
  params: IPageableRequest,
): Promise<IPageableResponse<ILoginHistory>> =>
  (
    await http.get('/user-profile/admin/user/login_history', {
      params: { userId, ...params },
    })
  ).data;

export const getUserById = async (userId: string): Promise<IUser> =>
  (await http.get('/user-profile/admin/user/user', { params: { userId } })).data;

export const getUserAvatar = async (userId: string): Promise<IGetAvatarResponse> =>
  (await http.get('/user-profile/admin/user/avatar', { params: { userId } })).data;

export const getAllUsers = async (params: IPageableRequest): Promise<IPageableResponse<IUser>> =>
  (await http.get('/user-profile/admin/user/get_all', { params })).data;

export const searchUsersByEmail = async (
  email: string,
  params: IPageableRequest,
): Promise<IPageableResponse<IUser>> =>
  (
    await http.get('/user-profile/admin/user/search/by_email', {
      params: {
        ...params,
        email,
      },
    })
  ).data;

export const updateUserRole = async (params: IUpdateUserRoleRequest): Promise<void> =>
  (
    await http.put('/user-profile/admin/user', null, {
      params: {
        userId: params.userId,
        newRole: params.newRole,
      },
    })
  ).data;

export const twoFaOff = async (userId: string): Promise<void> =>
  (
    await http.post('/user-profile/admin/user/2fa/off', null, {
      params: { userId },
    })
  ).data;

export const banUser = async (userId: string): Promise<void> =>
  (await http.post(`/user-profile/admin/user/${userId}/ban`)).data;

export const unbanUser = async (userId: string): Promise<void> =>
  (await http.post(`/user-profile/admin/user/${userId}/unban`)).data;

export const enableBlockedLogin = async (userId: string): Promise<void> =>
  (await http.put(`/user-profile/admin/user/${userId}/blocked-login/enable`)).data;

export const deleteUser = async (userId: string): Promise<void> =>
  (await http.delete(`/user-profile/admin/user/${userId}`)).data;

export const getUserId = async (accountId: string): Promise<string> =>
  (await http.get(`/user-profile/admin/user/id/${accountId}`)).data;
