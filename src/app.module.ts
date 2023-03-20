import { roles } from './auth/user-roles';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { AccessControlModule } from 'nest-access-control';

@Module({
  imports: [AdminModule,TypeOrmModule.forRoot({
    name:'default',
    type:"mongodb",
    host:"localhost",
    port:27017,
    database:"adminBluePrintDB",
    useNewUrlParser:true,
    useUnifiedTopology:true,
    autoLoadEntities:true,
    family:4,
    entities:[join(__dirname,'**/**.entity{.ts,.js}')]
  }), AuthModule, RoleModule,
AccessControlModule.forRoles(roles)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
