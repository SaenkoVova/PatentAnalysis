import { http } from 'boot/axios';
import type { IGetActiveBotsData } from 'src/types/ai-trading/IGetActiveBotsData';
import type { IPageableRequest } from 'src/types/common/IPageableRequest';
import type { IPageableResponse } from 'src/types/common/IPageableResponse';
import type { BotTypesEnum } from 'src/enums/ai-trading/BotTypesEnum';
import type { IDistributionTx } from 'src/types/ai-trading/IDistributionTranaction';
import type { IActivateDemoUserBotRequest } from 'src/types/ai-trading/IActivateDemoUserBotRequest';
import type { ILiquidateBotsRequest } from 'src/types/ai-trading/ILiquidateBotsRequest';
import type { ICreateProfitToUserBotRequest } from 'src/types/ai-trading/ICreateProfitToUserBotRequest';
import type { IActivateDefaultUserBotRequest } from 'src/types/ai-trading/IActivateDefaultUserBotRequest';
import type { IBot } from 'src/types/ai-trading/IBot';
import type { IWithdrawTransaction } from 'src/types/ai-trading/IWithdrawTransaction';
import type { IUpdateBotBalanceRequest } from 'src/types/ai-trading/IUpdateBotBalanceRequest';

export const getActiveBots = async (
  data: IGetActiveBotsData,
  params: IPageableRequest,
): Promise<IPageableResponse<IBot>> =>
  (
    await http.post('/trading-bot/admin/trading-bot/active', data, {
      params,
    })
  ).data;

export const getUserActiveBots = async (accountId: string): Promise<IBot[]> =>
  (await http.get(`/trading-bot/admin/trading-bot/${accountId}/active`)).data;

export const getUserDistributionTransactions = async (
  params: IPageableRequest,
  botType: BotTypesEnum,
  accountId: string,
): Promise<IPageableResponse<IDistributionTx>> =>
  (
    await http.get(
      `/trading-bot/admin/trading-bot/${accountId}/${botType}/distribution-transactions`,
      {
        params,
      },
    )
  ).data;

export const createDemoBotForUser = async (payload: IActivateDemoUserBotRequest): Promise<void> =>
  (await http.post(`/trading-bot/admin/trading-bot/${payload.accountId}/demo/create`, payload.bot))
    .data;

export const createDefaultBotForUser = async (
  payload: IActivateDefaultUserBotRequest,
): Promise<void> =>
  (
    await http.post(
      `/trading-bot/admin/trading-bot/${payload.accountId}/default/create`,
      payload.bot,
    )
  ).data;

export const topUpDefaultBotForUser = async (
  payload: IActivateDefaultUserBotRequest,
): Promise<void> =>
  (
    await http.post(
      `/trading-bot/admin/trading-bot/${payload.accountId}/default/top-up`,
      payload.bot,
    )
  ).data;

export const topUpDemoBotForUser = async (payload: IActivateDemoUserBotRequest): Promise<void> =>
  (await http.post(`/trading-bot/admin/trading-bot/${payload.accountId}/demo/top-up`, payload.bot))
    .data;

export const liquidateBots = async (payload: ILiquidateBotsRequest): Promise<void> =>
  (await http.post('/trading-bot/admin/trading-bot/liquidate', payload)).data;

export const deleteBots = async (payload: ILiquidateBotsRequest): Promise<void> =>
  (await http.post('/trading-bot/admin/trading-bot/delete', payload)).data;

export const createProfitToUserBot = async (
  payload: ICreateProfitToUserBotRequest,
): Promise<void> =>
  (
    await http.post(
      `/trading-bot/admin/trading-bot/${payload.accountId}/distribution-transactions`,
      {
        ...payload.data,
      },
    )
  ).data;

export const getUserWithdrawTransactions = async (
  params: IPageableRequest,
  accountId: string,
): Promise<IPageableResponse<IWithdrawTransaction>> =>
  (
    await http.get(`/trading-bot/admin/trading-bot/${accountId}/withdraw-transactions`, {
      params,
    })
  ).data;

export const updateBalance = async (data: IUpdateBotBalanceRequest): Promise<void> =>
  (await http.post(`/trading-bot/admin/trading-bot/update-balance`, data)).data;
