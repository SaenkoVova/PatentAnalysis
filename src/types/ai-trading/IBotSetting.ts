import type { BotTypesEnum } from 'src/enums/ai-trading/BotTypesEnum';

export interface IBotSetting {
  botType: BotTypesEnum;
  minStartAmount: number;
  defaultProfitPercent: number;
  defaultMonthDuration: number;
  withdrawProfitInterval: number;
}
