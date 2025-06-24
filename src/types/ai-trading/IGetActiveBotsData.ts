import type { AlgorithmTunesEnum } from 'src/enums/ai-trading/AlgorithmTunesEnum';
import type { BotTypesEnum } from 'src/enums/ai-trading/BotTypesEnum';

export interface IGetActiveBotsData {
  search: string | null;
  tuningType: AlgorithmTunesEnum | null;
  botType: BotTypesEnum | null;
}
