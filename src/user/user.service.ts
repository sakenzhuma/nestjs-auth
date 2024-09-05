import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { InjectModel } from '@nestjs/sequelize'
import { User } from './user.entity'
import { LoginDto, RegisterDto, RecoverDto, PinDto } from '../auth/auth.dto'
import { e } from '../utils/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userEntity: typeof User,
    private jwtService: JwtService
  ){}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    await this.userEntity.sync({ alter: true })
    return await this.userEntity.findAll()
  }

  async findOne(id: number){
    return await this.userEntity.findOne({ where: { id } })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async login(b: LoginDto) {
    const condition = { email: b.email.toLowerCase(), active: true }
    const row = await this.userEntity.findOne({ where: condition })
    if(! row) throw new UnauthorizedException()
    const isMatch = await bcrypt.compare(b.password, row.password)
    if(! isMatch) throw new UnauthorizedException()
    const account = { id: row.id, email: row.email,
      firstname: row.firstname, lastname: row.lastname }
    const token = await this.jwtService.signAsync({ id: row.id, email: row.email })
    return { account, token }
  }

  async register(b: RegisterDto) {
    const hash = await bcrypt.hash(b.password, 10);
    await this.userEntity.create({
      firstname : e(b.firstname), lastname: e(b.lastname),
      email: b.email, password: hash
    })
    return true
  }

  async recover(b: RecoverDto) {
    return true
  }

  async pin(b: PinDto) {
    return true
  }
}
