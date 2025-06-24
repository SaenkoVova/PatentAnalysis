import type { WithdrawalEligibilitiesEnum } from 'src/enums/ai-trading/WithdrawalEligibilitiesEnum';
import type { WithdrawTransactionTypesEnum } from 'src/enums/ai-trading/WithdrawTransactionTypesEnum';

export interface IWithdrawTransaction {
  created: string;
  amount: number;
  currency: string;
  transactionType: WithdrawTransactionTypesEnum;
  withdrawalEligibility: WithdrawalEligibilitiesEnum;
}
