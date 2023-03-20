import { Role } from './../role/entities/role.entity';
import { LocalAuthGuard } from './../auth/guards/local-auth.guard';
import { ObjectID } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { Admin } from './entities/admin.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { ACGuard, UseRoles } from 'nest-access-control';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post("/signup")
  @UseGuards(AuthenticatedGuard,ACGuard)
  @UseRoles({
    possession:'any',
    action:'create',
    resource:'user'
  })
  create(@Body() createAdminDto: CreateAdminDto):Promise<any> {
    return this.adminService.create(createAdminDto);
  }

  @Post("/login")
  @UseGuards(LocalAuthGuard)
  login(@Request() req
 ):Promise<Admin>{
    
    const user=req.user;
    console.log(user);
    
    return this.adminService.login(user)
  }

  @Get()
  @UseGuards(AuthenticatedGuard,ACGuard)
  @UseRoles({
    possession:'any',
    action:'read',
    resource:'user'
  })
  findAll():Promise<Admin[]> {
   
    
    return this.adminService.findAll();
  }

  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'The user session has ended' }
  }
  
  @Patch(':id')
  @UseGuards(AuthenticatedGuard,ACGuard)
  @UseRoles({
    possession:'any',
    action:'update',
    resource:'user'
  })
  update(@Param('id') id: ObjectID, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  
  @Delete(':id')
  @UseGuards(AuthenticatedGuard,ACGuard)
  @UseRoles({
    possession:'any',
    action:'delete',
    resource:'user'
  })
  remove(@Param('id') id: ObjectID) {
    return this.adminService.remove(id);
  }

  @Get(":id")
  @UseGuards(AuthenticatedGuard)
  findOneById(@Param() id:ObjectID,@Request() req):Promise<Admin>{
    console.log((req.params.id));
    
    return this.adminService.findAdminById(req.params.id)
  }

}
