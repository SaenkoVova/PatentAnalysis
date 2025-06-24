import { http } from 'boot/axios';
import type { IChangeWithdrawalLimitRequest } from 'src/types/user-profile/IChangeWithdrawalLimitRequest';

export const changeWithdrawLimit = async (data: IChangeWithdrawalLimitRequest): Promise<void> =>
  (await http.post('/user-profile/super-admin/withdraw/limit', data)).data;
