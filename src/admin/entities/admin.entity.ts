import { UserRoles } from './../../auth/user-roles';

import { Length ,IsEmail, IsNotEmpty} from "class-validator";
import { Role } from "src/role/entities/role.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ObjectID, ObjectIdColumn, OneToOne } from "typeorm";

@Entity()
export class Admin {

    @ObjectIdColumn()    
    id:ObjectID

    @Column() 
    @IsNotEmpty()
    name:string

    @Column()
    @IsNotEmpty() 
    @IsEmail()
    username:string

    @Column() 
    @IsNotEmpty()
    @Length(6,20)
    password:string

    // @OneToOne(()=>Role)
    // role:Role
    @Column({type:'enum',enum:UserRoles,default:UserRoles.User})
    roles:UserRoles

    @CreateDateColumn({name:"created_At"})
    createdAt:Date

    @CreateDateColumn({name:"updated_At"})
    updatedAt:Date
}
