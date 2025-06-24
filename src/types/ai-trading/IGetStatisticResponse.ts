import type { IBotStat } from 'src/types/ai-trading/IBotStat';

export interface IGetStatisticResponse {
  activeBotsCount: number;
  defaultBotsCount: number;
  defaultBotsProfitBalanceUsdEquivalent: number;
  demoBotsCount: number;
  withdrawAvailableAutoReinvestPercent: number;
  withdrawAvailableBotsCount: number;
  initialAmountByType: IBotStat;
  profitWithdrawalPlan: IBotStat;
}
