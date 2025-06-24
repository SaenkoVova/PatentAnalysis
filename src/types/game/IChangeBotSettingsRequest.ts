export interface IChangeBotSettingsRequest {
  enable?: boolean;
  runBalancingSystemBalances?: boolean;
  availableTargets?: number[];
  availableBetNumbers?: number[];
  maxOneSidePlayers?: number;
  minOneSidePlayers?: number;
  reboot?: boolean;
  systemLose?: number;
  disableUsersBets?: boolean;
  enableBalancing?: boolean;
}
