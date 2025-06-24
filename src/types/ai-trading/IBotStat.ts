import type { IAlgorithmStat } from 'src/types/ai-trading/IAlgorithmStat';

export interface IBotStat {
  BASE: IAlgorithmStat;
  PRO: IAlgorithmStat;
  START: IAlgorithmStat;
}
