export interface IGameConfig {
  availableBetNumbers: number[];
  availableTargets: number[];
  enableBalancing: boolean;
  maxOneSidMaxPlayers: number;
  minOneSidMaxPlayers: number;
  systemLose: number;
  systemUserBalance: number;
  systemUserCount: number;
}
