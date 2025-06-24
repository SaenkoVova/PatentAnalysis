import type { IRoundInfo } from 'src/types/game/IRoundInfo';

export interface IBet {
  created: number;
  value: number;
  up: boolean;
  wasWinn: boolean;
  system: boolean;
  round_info: IRoundInfo;
  player_id: string;
}
