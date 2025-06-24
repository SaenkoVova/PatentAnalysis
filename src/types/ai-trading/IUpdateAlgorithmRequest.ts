import type { AlgorithmTunesEnum } from 'src/enums/ai-trading/AlgorithmTunesEnum';

export interface IUpdateAlgorithmRequest {
  type: AlgorithmTunesEnum;
  riskLevel: number;
  profitPercent: number;
}
