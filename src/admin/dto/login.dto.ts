import { IsNotEmpty,IsEmail, Length } from "class-validator"

export class LoginDto {

    @IsNotEmpty()
    @IsEmail()
    username:string

    @IsNotEmpty()
    @Length(6,20)
    password:string
}