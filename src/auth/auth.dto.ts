import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class LoginDto {
   @IsEmail()
   email: string
   @Length(8,16)
   password: string
}

export class RegisterDto {
   @IsNotEmpty()
   firstname: string
   @IsNotEmpty()
   lastname: string
   @IsEmail()
   email: string
   @Length(8,16)
   password: string
}

export class RecoverDto {
   @IsEmail()
   email: string
   @Length(8,16)
   pin: string
}

export class PinDto {
   @IsEmail()
   email: string
}
