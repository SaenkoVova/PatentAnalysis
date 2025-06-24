import type { AlgorithmTunesEnum } from 'src/enums/ai-trading/AlgorithmTunesEnum';

export interface IAlgorithmTune {
  type: AlgorithmTunesEnum;
  riskLevel: number;
  profitPercent: number;
}
