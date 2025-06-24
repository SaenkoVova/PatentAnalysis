import type { AlgorithmTunesEnum } from 'src/enums/ai-trading/AlgorithmTunesEnum';
import type { BotTypesEnum } from 'src/enums/ai-trading/BotTypesEnum';
import type { BotOriginsEnum } from 'src/enums/ai-trading/BotOriginsEnum';
import type { BotStatusesEnum } from 'src/enums/ai-trading/BotStatusesEnum';
import type { WithdrawalEligibilitiesEnum } from 'src/enums/ai-trading/WithdrawalEligibilitiesEnum';

export interface IBot {
  accountAvatar: string | null;
  accountEmail: string;
  accountId: number;
  algorithmTuningType: AlgorithmTunesEnum;
  botType: BotTypesEnum;
  compoundedAmount: number;
  currency: string;
  endDate: string;
  id: string;
  initialAmount: number;
  isCloseBotAvailable: boolean;
  isProfitWithdrawAvailable: boolean;
  nextDailyProfitDate: string;
  nextWithdrawProfitDate: string;
  origin: BotOriginsEnum;
  profitBalance: number;
  profitMode: string;
  startDate: string;
  status: BotStatusesEnum;
  totalProfit: number;
  transactionId: number | null;
  withdrawalEligibility: WithdrawalEligibilitiesEnum;
}
