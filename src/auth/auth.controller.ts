import { Request as Req } from 'express';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from './local-auth-guard';

@Controller('auth')
export class AuthController {
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: Req) {
    return req.user;
  }
}
