import type { AlgorithmTunesEnum } from 'src/enums/ai-trading/AlgorithmTunesEnum';

export interface IDistributionTx {
  created: string;
  autoReinvest: boolean;
  algorithmTuningType: AlgorithmTunesEnum;
  compoundedAmount: number;
  dailyProfitPercent: number;
  dailyProfitValue: number;
  id: string;
}
