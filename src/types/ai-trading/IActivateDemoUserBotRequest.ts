import type { IActivateDemoBotRequest } from 'src/types/ai-trading/IActivateDemoBotRequest';

export interface IActivateDemoUserBotRequest {
  bot: IActivateDemoBotRequest;
  accountId: string;
}
