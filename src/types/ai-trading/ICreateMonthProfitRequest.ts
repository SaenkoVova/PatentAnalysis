import type { BotTypesEnum } from 'src/enums/ai-trading/BotTypesEnum';

export interface ICreateMonthProfitRequest {
  botType: BotTypesEnum;
  monthPercentage: number;
}
