import { http } from 'boot/axios';
import type { IGetUserMainWalletsResponse } from 'src/types/crypto/IGetUserMainWalletsResponse';
import type { IChangeBalanceRequest } from 'src/types/crypto/IChangeBalanceRequest';

export const getUserWallets = async (userId: string): Promise<IGetUserMainWalletsResponse> =>
  (await http.get('/crypto/admin/get_user_wallets', { params: { userId } })).data;

export const addToUserBalance = async (params: IChangeBalanceRequest): Promise<void> =>
  (await http.post('/crypto/admin/add_to_user_balance', null, { params })).data;

export const subFromUserBalance = async (params: IChangeBalanceRequest): Promise<void> =>
  (await http.post('/crypto/admin/sub_from_user_balance', null, { params })).data;
