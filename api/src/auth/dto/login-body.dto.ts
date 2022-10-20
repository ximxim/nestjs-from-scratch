import { ApiProperty } from '@nestjs/swagger';

export class LoginBodyDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
