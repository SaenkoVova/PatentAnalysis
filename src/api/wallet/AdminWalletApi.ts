import { http } from 'boot/axios';
import type { ITradingWallet } from 'src/types/wallet/ITradingWallet';
import type { IWalletInfo } from 'src/types/wallet/IWalletInfo';
import type { IGetExpectedMinValueRequest } from 'src/types/ai-trading/IGetExpectedMinValueRequest';
import type { IGetExpectedMinValueResponse } from 'src/types/ai-trading/IGetExpectedMinValueResponse';
import type { IPageableRequest } from 'src/types/common/IPageableRequest';
import type { IPageableResponse } from 'src/types/common/IPageableResponse';
import type { ITradingWalletTx } from 'src/types/wallet/ITradingWalletTx';

export const getUserWallets = async (userId: string): Promise<ITradingWallet[]> =>
  (await http.get(`/wallet/admin/wallet/${userId}/balances`)).data;

export const getTransactions = async (
  userId: string,
  params: IPageableRequest,
): Promise<IPageableResponse<ITradingWalletTx>> =>
  (await http.get(`/wallet/admin/wallet/${userId}/transactions`, { params })).data;

export const getWalletInfo = async (userId: string): Promise<IWalletInfo> =>
  (await http.get(`/wallet/admin/wallet/${userId}/info`)).data;

export const getExpectedMinValue = async (
  payload: IGetExpectedMinValueRequest,
): Promise<IGetExpectedMinValueResponse> =>
  (await http.post('/wallet/trading-bot/expected-min-value', payload)).data;
