import { http } from 'boot/axios';
import type { IPageableRequest } from 'src/types/common/IPageableRequest';
import type { IPageableResponse } from 'src/types/common/IPageableResponse';
import type { IWithdrawalRequest } from 'src/types/crypto/IWithdrawalRequest';

export const getWithdrawalRequests = async (
  params: IPageableRequest,
): Promise<IPageableResponse<IWithdrawalRequest>> =>
  (await http.get('/crypto/admin/withdrawal_requests', { params })).data;

export const withdrawalRequestApprove = async (transactionId: string): Promise<void> =>
  (
    await http.post('/crypto/admin/withdrawal_request_approve', null, {
      params: { transactionId },
    })
  ).data;

export const withdrawalRequestReject = async (transactionId: string): Promise<void> =>
  (
    await http.post('/crypto/admin/withdrawal_request_reject', null, {
      params: { transactionId },
    })
  ).data;
