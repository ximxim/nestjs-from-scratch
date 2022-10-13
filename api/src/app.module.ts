import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmOptions } from './typeorm';
import { PerkModule } from './perk/perk.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmOptions),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PerkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
