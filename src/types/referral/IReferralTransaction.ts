import type { IDepositOwner } from 'src/types/referral/IDepositOwner';
import type { IPreviousAccount } from 'src/types/referral/IPreviousAccount';

export interface IReferralTransaction {
  calculatedCommission: number;
  calculatedReferralAmount: number;
  commissionSetting: number;
  created: string;
  depositOwner: IDepositOwner;
  level: number;
  nodeOrder: number;
  previousAccount: IPreviousAccount;
  previousLevel: number | null;
  previousLevelCommissionSetting: number | null;
  sameLevelCommissionSetting: number;
  sameLevelCommissionUsed: boolean;
}
