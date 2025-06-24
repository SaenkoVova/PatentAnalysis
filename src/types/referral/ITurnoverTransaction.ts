import type { IDepositOwner } from 'src/types/referral/IDepositOwner';
import type { AccrualStatusesEnum } from 'src/enums/referral/AccrualStatusesEnum';

export interface ITurnoverTransaction {
  created: string;
  depositOwner: IDepositOwner;
  level: number;
  maxAllowedTurnover: number;
  receivedFromCurrentKnee: number;
  depositAmount: number;
  receivedAmount: number;
  accrualStatus: AccrualStatusesEnum;
}
