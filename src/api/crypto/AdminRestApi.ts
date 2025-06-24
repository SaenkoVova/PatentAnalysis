import { http } from 'boot/axios';
import type { ISystemWallet } from 'src/types/crypto/ISystemWallet';
import type { IPageableResponse } from 'src/types/common/IPageableResponse';
import type { ITransactionWithFlow } from 'src/types/crypto/ITransactionWithFlow';
import type { IGetUserTransactionsRequest } from 'src/types/crypto/IGetUserTransactionsRequest';
import type { IGetAllTransactionsByFilterRequest } from 'src/types/crypto/IGetAllTransactionsByFilterRequest';
import type { IPageableRequest } from 'src/types/common/IPageableRequest';
import type { ICurrencyFee } from 'src/types/crypto/ICurrencyFee';
import type { IChangeCurrencyFeeRequest } from 'src/types/crypto/IChangeCurrencyFeeRequest';

export const getSystemWalletsInfo = async (): Promise<ISystemWallet[]> =>
  (await http.get('/crypto/admin/get_system_wallets_info')).data;

export const getUserTransactions = async (
  params: IGetUserTransactionsRequest,
): Promise<IPageableResponse<ITransactionWithFlow>> =>
  (await http.get('/crypto/admin/get_user_transactions', { params })).data;

export const getAllTransactionsByFilter = async (
  params: IGetAllTransactionsByFilterRequest,
): Promise<IPageableResponse<ITransactionWithFlow>> =>
  (await http.get('/crypto/admin/get_all_users_transactions', { params })).data;

export const getCurrenciesFee = async (
  params: IPageableRequest,
): Promise<IPageableResponse<ICurrencyFee>> =>
  (await http.get('/crypto/admin/get_currencies_fee', { params })).data;

export const changeCurrencyFee = async (params: IChangeCurrencyFeeRequest): Promise<void> =>
  (await http.post('/crypto/admin/change_currency_fee', null, { params })).data;
