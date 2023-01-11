import { SetMetadata } from "@nestjs/common";
import { UserRoles } from "../user-roles.enum";
// export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRoles[])=> SetMetadata('roles', roles);

// export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
