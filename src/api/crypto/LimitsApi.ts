import type { IPageableRequest } from 'src/types/common/IPageableRequest';
import type { IPageableResponse } from 'src/types/common/IPageableResponse';
import { http } from 'boot/axios';
import type { IAlert } from 'src/types/crypto/IAlert';
import type { IAutomaticWithdrawLimit } from 'src/types/crypto/IAutomaticWithdrawLimit';
import type { IWithdrawLimit } from 'src/types/crypto/IWithdrawLimit';
import type { IAlertByCorporation } from 'src/types/crypto/IAlertByCorporation';
import type { ICorporationInfo } from 'src/types/crypto/ICorporationInfo';
import type { IChangeLimitByUserRequest } from 'src/types/crypto/IChangeLimitByUserRequest';

export const getCorporationInfo = async (): Promise<ICorporationInfo> =>
  (await http.get('/crypto/admin/get_corporation_info')).data;

export const getAlertsByUser = async (
  params: IPageableRequest,
): Promise<IPageableResponse<IAlert>> =>
  (await http.get('/crypto/admin/get_alerts_by_user', { params })).data;

export const getSupportedFiatCurrencies = async (): Promise<string[]> =>
  (await http.get('/crypto/admin/get_supported_fiat_currencies')).data;

export const getAutomaticWithdrawLimitByCorporation = async (): Promise<
  IAutomaticWithdrawLimit[]
> => (await http.get('/crypto/admin/get_automatic_withdraw_limit_by_corporation')).data;

export const getWithdrawDayLimitByCorporation = async (): Promise<IWithdrawLimit> =>
  (await http.get('/crypto/admin/get_withdraw_day_limit_by_corporation')).data;

export const getWithdrawMonthLimitByCorporation = async (): Promise<IWithdrawLimit> =>
  (await http.get('/crypto/admin/get_withdraw_month_limit_by_corporation')).data;

export const getAlertByCorporation = async (): Promise<IAlertByCorporation> =>
  (await http.get('/crypto/admin/get_alert_by_corporation')).data;

export const changeAutomaticWithdrawLimitByCorporation = async (limit: string): Promise<void> =>
  (
    await http.post('/crypto/admin/change_automatic_withdraw_limit_by_corporation', null, {
      params: { limit },
    })
  ).data;

export const changeWithdrawDayLimitByCorporation = async (limit: string): Promise<void> =>
  (
    await http.post('/crypto/admin/change_withdraw_day_limit_by_corporation', null, {
      params: { limit },
    })
  ).data;

export const changeWithdrawMonthLimitByCorporation = async (limit: string): Promise<void> =>
  (
    await http.post('/crypto/admin/change_withdraw_month_limit_by_corporation', null, {
      params: { limit },
    })
  ).data;

export const changeAlertLimitByCorporation = async (amount: string): Promise<void> =>
  (
    await http.post('/crypto/admin/change_alert_limit_by_corporation', null, {
      params: { amount },
    })
  ).data;

export const changeMainFiatCurrencyByCorporation = async (currency: string): Promise<void> =>
  (
    await http.post('/crypto/admin/change_main_fiat_currency_by_corporation', null, {
      params: { currency },
    })
  ).data;

export const changeWithdrawMonthLimitByUser = async (
  params: IChangeLimitByUserRequest,
): Promise<void> =>
  (
    await http.post('/crypto/admin/change_withdraw_month_limit_by_user', null, {
      params,
    })
  ).data;

export const changeWithdrawDayLimitByUser = async (
  params: IChangeLimitByUserRequest,
): Promise<void> =>
  (
    await http.post('/crypto/admin/change_withdraw_day_limit_by_user', null, {
      params,
    })
  ).data;

export const changeAutomaticWithdrawLimitByUser = async (
  params: IChangeLimitByUserRequest,
): Promise<void> =>
  (await http.post('/crypto/admin/change_automatic_withdraw_limit_by_user', null, { params })).data;

export const getWithdrawMonthLimitByUser = async (userId: string): Promise<IWithdrawLimit> =>
  (
    await http.get('/crypto/admin/get_withdraw_month_limit_by_user', {
      params: { userId },
    })
  ).data;

export const getWithdrawDayLimitByUser = async (userId: string): Promise<IWithdrawLimit> =>
  (
    await http.get('/crypto/admin/get_withdraw_day_limit_by_user', {
      params: { userId },
    })
  ).data;

export const getAutomaticWithdrawLimitByUser = async (
  userId: string,
): Promise<IAutomaticWithdrawLimit> =>
  (
    await http.get('/crypto/admin/get_automatic_withdraw_limit_by_user', {
      params: { userId },
    })
  ).data;
