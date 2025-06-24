import type { UserRolesEnum } from 'src/enums/user/UserRolesEnum';
import type { UserStatusesEnum } from 'src/enums/user/UserStatusesEnum';

export interface IUser {
  userId: string;
  accountId: number;
  registered: string;
  lastEntry: string | null;
  role: UserRolesEnum;
  email: string;
  status: UserStatusesEnum;
  twoFaLogin: boolean;
  mailConfirmLogin: boolean;
  failedLoginAttempts: number;
  blockedLoginUntil: string | null;
  phoneNumber: string | null;
  telegramNickname: string | null;
}
