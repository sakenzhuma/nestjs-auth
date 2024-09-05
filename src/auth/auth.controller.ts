import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto, RegisterDto, RecoverDto, PinDto } from './auth.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly userService: UserService
  ) {}

  @Post('login')
  async login(@Body() b: LoginDto){
    return await this.userService.login(b);
  }

  @Post('register')
  async register(@Body() b: RegisterDto){
    return await this.userService.register(b);
  }

  @Post('recover')
  async recover(@Body() b: RecoverDto){
    return await this.userService.recover(b);
  }

  @Post('pin')
  async pin(@Body() b: PinDto){
    const n = 'Apple'
    return `${n}`
  }
}
