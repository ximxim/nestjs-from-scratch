import { Request as Req } from 'express';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from './local-auth-guard';
import { JWTAuthGuard } from './jwt-auth-guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: Req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @UseGuards(JWTAuthGuard)
  async profile(@Request() req: Req) {
    return req.user;
  }
}
