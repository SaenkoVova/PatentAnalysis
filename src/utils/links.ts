import { RoutePathsEnum } from 'src/enums/common/RoutePathsEnum';

export const homeLink = () => RoutePathsEnum.ROOT;

export const signInLink = () => `/${RoutePathsEnum.SIGN_IN}`;

export const maintenanceLink = () => `/${RoutePathsEnum.MAINTENANCE}`;

export const patentsLink = () => `/${RoutePathsEnum.PATENTS}`;

const userLayoutLink = (userId: string, accountId?: string) =>
  accountId ? `/users/${userId}/${accountId}` : `/users/${userId}`;

export const userMainWalletLink = (userId: string, accountId?: string) =>
  userLayoutLink(userId, accountId);

export const userTradingWalletLink = (userId: string, accountId?: string) =>
  `${userLayoutLink(userId, accountId)}/${RoutePathsEnum.TRADING_WALLET}`;

export const userLoginHistoryLink = (userId: string, accountId?: string) =>
  `${userLayoutLink(userId, accountId)}/${RoutePathsEnum.LOGIN_HISTORY}`;

export const userAlertsLink = (userId: string, accountId?: string) =>
  `${userLayoutLink(userId, accountId)}/${RoutePathsEnum.ALERTS}`;

export const userTransactionsLink = (userId: string, accountId?: string) =>
  `${userLayoutLink(userId, accountId)}/${RoutePathsEnum.TRANSACTIONS}`;

export const userTradesLink = (userId: string, accountId?: string) =>
  `${userLayoutLink(userId, accountId)}/${RoutePathsEnum.TRADES}`;

export const userLimitsLink = (userId: string, accountId?: string) =>
  `${userLayoutLink(userId, accountId)}/${RoutePathsEnum.LIMITS}`;

export const userReferralTreeLink = (userId: string, accountId?: string) =>
  `${userLayoutLink(userId, accountId)}/${RoutePathsEnum.REFERRAL}`;

export const userActiveBotsLink = (userId: string, accountId?: string) =>
  `${userLayoutLink(userId, accountId)}/${RoutePathsEnum.AI_TRADING}`;

export const userReferralTransactionsLink = (userId: string, accountId?: string) =>
  `${userReferralTreeLink(userId, accountId)}/${RoutePathsEnum.REFERRAL_TRANSACTIONS}`;

export const userTurnoverTransactionsLink = (userId: string, accountId?: string) =>
  `${userReferralTreeLink(userId, accountId)}/${RoutePathsEnum.TURNOVER_TRANSACTIONS}`;

export const userReferralProfitTransactionsLink = (userId: string, accountId?: string) =>
  `${userReferralTreeLink(userId, accountId)}/${RoutePathsEnum.PROFIT_TRANSACTIONS}`;

export const userDistributionTransactionsLink = (userId: string, accountId?: string) =>
  `${userActiveBotsLink(userId, accountId)}/${RoutePathsEnum.DISTRIBUTION_TRANSACTIONS}`;

export const userWithdrawTransactionsLink = (userId: string, accountId?: string) =>
  `${userActiveBotsLink(userId, accountId)}/${RoutePathsEnum.WITHDRAW_TRANSACTIONS}`;

export const userProfitsLink = (userId: string, accountId?: string) =>
  `${userActiveBotsLink(userId, accountId)}/${RoutePathsEnum.PROFITS}`;

export const userOpenOrdersLink = (userId: string, accountId?: string) =>
  `${userLayoutLink(userId, accountId)}/${RoutePathsEnum.ORDERS}`;

export const userHistoryOrdersLink = (userId: string, accountId?: string) =>
  `${userOpenOrdersLink(userId, accountId)}/${RoutePathsEnum.HISTORY}`;

export const userSandboxInfoLink = (userId: string, accountId?: string) =>
  `${userLayoutLink(userId, accountId)}/${RoutePathsEnum.SANDBOX}`;

export const userSandboxBetsLink = (userId: string, accountId?: string) =>
  `${userSandboxInfoLink(userId, accountId)}/${RoutePathsEnum.BETS}`;

export const aiTradingActiveBotsLink = () => `/${RoutePathsEnum.AI_TRADING}`;

export const aiTradingProfitsLink = () => `${aiTradingActiveBotsLink()}/${RoutePathsEnum.PROFITS}`;

export const aiTradingBotsSettingsLink = () =>
  `${aiTradingActiveBotsLink()}/${RoutePathsEnum.SETTINGS}`;

export const aiTradingBotsStatisticLink = () =>
  `${aiTradingActiveBotsLink()}/${RoutePathsEnum.STATISTIC}`;

export const aiTradingBotsStatisticWithdrawLink = () =>
  `${aiTradingBotsStatisticLink()}/${RoutePathsEnum.WITHDRAW}`;

export const aiTradingAlgorithmSettingsLink = () =>
  `${aiTradingBotsSettingsLink()}/${RoutePathsEnum.ALGORITHM}`;

export const pairsLink = () => `/${RoutePathsEnum.PAIRS}`;

export const pairsCurrenciesLink = () => `${pairsLink()}/${RoutePathsEnum.CURRENCIES}`;

export const transactionsLink = () => `/${RoutePathsEnum.TRANSACTIONS}`;

export const withdrawalRequestsLink = () =>
  `${transactionsLink()}/${RoutePathsEnum.WITHDRAWAL_REQUESTS}`;
