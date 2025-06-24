import { http } from 'boot/axios';
import type { IMinWithdrawalAmount } from 'src/types/crypto/IMinWithdrawalAmount';
import type { IChangeMinWithdrawalAmountByCorporationRequest } from 'src/types/crypto/IChangeMinWithdrawalAmountByCorporationRequest';

export const getMinWithdrawalAmountByCorporation = async (): Promise<IMinWithdrawalAmount[]> =>
  (await http.get('/crypto/admin/get_min_withdrawal_amount_by_corporation')).data;

export const changeMinWithdrawalAmountByCorporation = async (
  params: IChangeMinWithdrawalAmountByCorporationRequest,
): Promise<void> =>
  (
    await http.post('/crypto/admin/change_min_withdrawal_amount_by_corporation', null, {
      params,
    })
  ).data;
