import type { BotTypesEnum } from 'src/enums/ai-trading/BotTypesEnum';
import type { AlgorithmTunesEnum } from 'src/enums/ai-trading/AlgorithmTunesEnum';

export interface IActivateDefaultBotRequest {
  currency?: string;
  botType: BotTypesEnum;
  autoReinvest: boolean;
  amount: number;
  algorithmTuning: AlgorithmTunesEnum;
}
