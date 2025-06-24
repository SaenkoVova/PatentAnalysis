import type { BotTypesEnum } from 'src/enums/ai-trading/BotTypesEnum';

export interface IUpdateBotSettingRequest {
  botType: BotTypesEnum;
  minStartAmount: number;
  defaultMonthDuration: number;
  defaultProfitPercent: number;
  withdrawProfitInterval: number;
}
