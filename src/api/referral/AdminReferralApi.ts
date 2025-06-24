import { http } from 'boot/axios';
import type { EarnPeriodsEnum } from 'src/enums/referral/EarnPeriodsEnum';
import type { IGetReferralsCountResponse } from 'src/types/referral/IGetReferralsCountResponse';
import type { IReferralInfo } from 'src/types/referral/IReferralInfo';
import type { IPageableRequest } from 'src/types/common/IPageableRequest';
import type { IPageableResponse } from 'src/types/common/IPageableResponse';
import type { IReferralTransaction } from 'src/types/referral/IReferralTransaction';
import type { ITurnoverTransaction } from 'src/types/referral/ITurnoverTransaction';
import type { IReferralNode } from 'src/types/referral/IReferralNode';
import type { IChangeReferralLeadRequest } from 'src/types/referral/IChangeReferralLeadRequest';
import type { IGetUserReferralResponse } from 'src/types/referral/IGetUserReferralResponse';
import type { IChangeReferralLevelRequest } from 'src/types/referral/IChangeReferralLevelRequest';
import type { IChangeTurnoverRequest } from 'src/types/referral/IChangeTurnoverRequest';

export const getEarnedByPeriod = async (
  filter: EarnPeriodsEnum,
  accountId: string,
): Promise<number> =>
  (await http.get(`/referral/admin/referral/${accountId}/${filter}/earned`)).data;

export const getUserLead = async (accountId: string): Promise<IGetUserReferralResponse> =>
  (await http.get(`/referral/admin/referral/${accountId}/lead`)).data;

export const getReferralCount = async (accountId: string): Promise<IGetReferralsCountResponse> =>
  (await http.get(`/referral/admin/referral/${accountId}/count`)).data;

export const getReferralInfo = async (accountId: string): Promise<IReferralInfo> =>
  (await http.get(`/referral/admin/referral/${accountId}/info`)).data;

export const getReferralTransactions = async (
  params: IPageableRequest,
  accountId: string,
): Promise<IPageableResponse<IReferralTransaction>> =>
  (
    await http.get(`/referral/admin/referral/${accountId}/transactions`, {
      params,
    })
  ).data;

export const getReferralTurnoverTransactions = async (
  params: IPageableRequest,
  accountId: string,
): Promise<IPageableResponse<ITurnoverTransaction>> =>
  (await http.get(`/referral/admin/referral/${accountId}/turnover-transactions`, { params })).data;

export const getReferralNodesByLeadId = async (accountId: string): Promise<IReferralNode[]> =>
  (await http.get(`/referral/admin/referral/nodes/${accountId}`)).data;

export const changeLead = async (payload: IChangeReferralLeadRequest): Promise<IReferralNode[]> =>
  (
    await http.put(`/referral/admin/referral/${payload.accountId}/change-lead`, {
      email: payload.email,
    })
  ).data;

export const dropLead = async (accountId: string): Promise<void> =>
  (await http.delete(`/referral/admin/referral/${accountId}/drop-lead`)).data;

export const changeTurnover = async (val: IChangeTurnoverRequest): Promise<void> =>
  (
    await http.put(`/referral/admin/referral/${val.accountId}/change-turnover`, {
      turnover: val.turnover,
    })
  ).data;

export const changeReferralLevel = async (val: IChangeReferralLevelRequest): Promise<void> =>
  (
    await http.put(`/referral/admin/referral/${val.accountId}/change-referral-lvl`, {
      level: val.level,
    })
  ).data;
