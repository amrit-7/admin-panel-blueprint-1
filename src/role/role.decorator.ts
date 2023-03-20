import { Role } from './entities/role.entity';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: Role[]) => SetMetadata('role', roles);
