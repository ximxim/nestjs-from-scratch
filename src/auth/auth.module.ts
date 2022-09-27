import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalAuthStrategy } from './local-auth-strategy';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalAuthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
