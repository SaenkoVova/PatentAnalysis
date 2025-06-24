import type { BotTypesEnum } from 'src/enums/ai-trading/BotTypesEnum';
import type { IDailyProfit } from 'src/types/ai-trading/IDailyProfit';

export interface IMonthProfit {
  botType: BotTypesEnum;
  monthProfit: number;
  dailyProfits: IDailyProfit[];
}
