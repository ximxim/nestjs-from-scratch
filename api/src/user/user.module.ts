import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile, User } from '../typeorm';
import { modules } from './modules';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile]), ...modules],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
