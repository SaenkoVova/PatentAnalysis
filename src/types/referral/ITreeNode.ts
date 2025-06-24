export interface ITreeNode {
  id: string;
  children?: ITreeNode[];
  email: string;
  loading: boolean;
  hasChildren: boolean;
  accountId: string;
  avatarUrl: string;
  registeredAt: string;
  level: number;
  depositAmount: number;
  teamTurnover: number;
  leadLevelTeamTurnover: number;
  availableToTopUpLevel: boolean;
  totalReceivedTurnover: number;
  phoneNumber: string | null;
  telegramNickname: string | null;
}
