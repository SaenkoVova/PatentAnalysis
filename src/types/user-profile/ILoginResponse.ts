import type { UserRolesEnum } from 'src/enums/user/UserRolesEnum';

export interface ILoginResponse {
  accessToken: string;
  tokenType: string;
  userId: number;
  userRole: UserRolesEnum;
  refreshToken: string;
}
