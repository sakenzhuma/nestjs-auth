import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

const sqlite: SequelizeModuleOptions = {
  dialect: 'sqlite', storage: '.db/data.sqlite3',
  autoLoadModels: true, synchronize: false
}

@Module({
  imports: [SequelizeModule.forRoot(sqlite), UserModule, AuthModule],
  controllers: [AppController],
  providers: [],
})

export class AppModule {}
