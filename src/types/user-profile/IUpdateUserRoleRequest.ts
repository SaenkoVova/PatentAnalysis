import type { UserRolesEnum } from 'src/enums/user/UserRolesEnum';

export interface IUpdateUserRoleRequest {
  userId: string;
  newRole: UserRolesEnum;
}
