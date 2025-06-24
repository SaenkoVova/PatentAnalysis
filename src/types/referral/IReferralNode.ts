export interface IReferralNode {
  accountId: number;
  email: string;
  avatarUrl: string;
  registeredAt: string;
  level: number;
  depositAmount: number;
  teamTurnover: number;
  hasChildren: boolean;
  leadLevelTeamTurnover: number;
  availableToTopUpLevel: boolean;
  totalReceivedTurnover: number;
  phoneNumber: string | null;
  telegramNickname: string | null;
}
