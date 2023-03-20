import { ObjectID } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcryptjs';
import { validate } from 'class-validator';

@Injectable()
export class AdminService {

  constructor(@InjectRepository(Admin)
  private readonly adminRepository:Repository<Admin>){}

 async  create(createAdminDto: CreateAdminDto):Promise<any> {
    const {name,username,password,roles}=createAdminDto;
    // const user={
    //   name,
    //   username,
    //   password
    // }
    
  let user= new Admin()
  user.name = name
  user.username = username
  user.password = password
  user.roles=roles

    
    const errors = await validate(user)
    if (errors.length > 0) {
      const arr=[]
      errors.forEach(error=>
        arr.push(error.constraints)
        )
        return arr
    } else {
    const hashedPassword=await bcrypt.hash(password,10);
    
    return await this.adminRepository.save({
      name,
      username,
      password:hashedPassword,
      roles
    });
  }
  }

 async findAll() :Promise<Admin[]>{
    return this.adminRepository.find();
  }

 async login(user):Promise<any>{
  return {"user":user.name,"msg":"Logged In "};
 } 


//  async findOneById(id: ObjectID):Promise<Admin> {
//     const user=await this.adminRepository.findOne({
//       where: {
//         id:id,
//       }
//     })
//     if(!user){
//       throw new UnauthorizedException()
//     }
//     return user  ;
//   }

  async update(id: ObjectID, updateAdminDto: UpdateAdminDto) {
    // const hashedPassword=bcrypt.hash(updateAdminDto.password,10)
    const user= await this.adminRepository.update(id,updateAdminDto)
    return user ;
  }

  async remove(id: ObjectID):Promise<any> {
    await this.adminRepository.delete(id)
    return "user is deleted" ;
  }

  async findOne(username:string):Promise<Admin>{
    return this.adminRepository.findOne({
      where: {
        username:username,
      }
    })
  }

  async findAdminById(id:ObjectID):Promise<any>{
    console.log(id);
    
   const user=await this.adminRepository.findOneBy({
 id
   })
    console.log(user);
    if(user==null){
      return "No user found"
    }
    return user;
    
  }

 
}
