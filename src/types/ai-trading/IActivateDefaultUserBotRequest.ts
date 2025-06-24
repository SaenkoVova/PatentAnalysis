import type { IActivateDefaultBotRequest } from 'src/types/ai-trading/IActivateDefaultBotRequest';

export interface IActivateDefaultUserBotRequest {
  bot: IActivateDefaultBotRequest;
  accountId: string;
}
