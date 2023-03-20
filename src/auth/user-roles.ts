import { RolesBuilder } from "nest-access-control";

export enum UserRoles{
    Admin='admin',
    User='user '
}

export const roles:RolesBuilder=new RolesBuilder();

roles.grant(UserRoles.User)
    .readOwn(["details"])
    .deleteOwn(["details"])
    .updateOwn(["details"])
    .grant(UserRoles.Admin)
    .extend(UserRoles.User)
    .createAny(["user"])
    .readAny(["user"])
    .deleteAny(["user"])
    .updateAny(["user"])