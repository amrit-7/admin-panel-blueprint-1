import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {join} from 'path';
import { Admin } from './entities/admin.entity';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports:[TypeOrmModule.forFeature([Admin]),PassportModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports:[AdminService]
})
export class AdminModule {}
