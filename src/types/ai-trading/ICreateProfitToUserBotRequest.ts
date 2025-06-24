import type { BotTypesEnum } from 'src/enums/ai-trading/BotTypesEnum';

export interface ICreateProfitToUserBotRequest {
  accountId: number;
  data: {
    daysCount: number;
    expectedProfitPercent: number;
    botType: BotTypesEnum;
  };
}
