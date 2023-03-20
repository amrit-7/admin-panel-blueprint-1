import { SessionSerializer } from './session.serializer';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from './../admin/admin.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports:[AdminModule,PassportModule],
  providers: [AuthService,LocalStrategy,SessionSerializer]
})
export class AuthModule {}
