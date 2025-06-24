import type { IActivateDefaultBotRequest } from 'src/types/ai-trading/IActivateDefaultBotRequest';

export interface IActivateDemoBotRequest extends IActivateDefaultBotRequest {
  ownDeposit: boolean;
  distributeProfit: boolean;
  enabledWithdrawProfit: boolean;
}
