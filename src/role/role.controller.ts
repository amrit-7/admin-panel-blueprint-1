import { Admin } from 'typeorm';
import { RoleGuard } from './role.guard';
import { Role } from './../role/entities/role.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request, UnauthorizedException } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { Roles } from './role.decorator';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('/add')
  @UseGuards(AuthenticatedGuard,RoleGuard)
  async create(@Body() createRoleDto: CreateRoleDto,
  @Request() req):Promise<any> {
    console.log(req.user);
    if(req.role==="ADMIN") {
    return await this.roleService.create(createRoleDto);
    }else{
      throw new ForbiddenException();
    }
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
