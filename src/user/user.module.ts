import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { APP_KEY } from '../utils/constants'

const jwt = { global: true, secret: APP_KEY, signOptions: { expiresIn: '60s' }}

@Module({
  imports:[SequelizeModule.forFeature([User]), JwtModule.register(jwt)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
