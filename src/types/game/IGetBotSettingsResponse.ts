import type { IBalancingData } from 'src/types/game/IBalancingData';
import type { IGameConfig } from 'src/types/game/IGameConfig';

export interface IGetBotSettingsResponse {
  balancingData: IBalancingData;
  config: IGameConfig;
  enableBot: boolean;
}
