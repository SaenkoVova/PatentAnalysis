export interface IProfileInfo {
  id: string;
  accountId: number;
  registered: string;
  email: string;
  isAdmin: boolean;
  twoFaLogin: boolean;
  mailConfirmLogin: boolean;
}
