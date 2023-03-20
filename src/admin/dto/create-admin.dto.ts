import { UserRoles } from './../../auth/user-roles';
export class CreateAdminDto {
    name:string
    username:string
    password:string
    roles:UserRoles
}
