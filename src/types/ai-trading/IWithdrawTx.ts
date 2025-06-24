import type { WithdrawTxTypeEnum } from 'src/enums/ai-trading/WithdrawTxTypesEnum';
import type { WithdrawalEligibilitiesEnum } from 'src/enums/ai-trading/WithdrawalEligibilitiesEnum';

export interface IWithdrawTx {
  created: string;
  amount: number;
  currency: string;
  transactionType: WithdrawTxTypeEnum;
  withdrawalEligibility: WithdrawalEligibilitiesEnum;
}
