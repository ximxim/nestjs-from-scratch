import { Controller, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JWTAuthGuard } from '../auth/jwt-auth-guard';
import { User } from '../typeorm';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: User,
  },
})
@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
@UseGuards(JWTAuthGuard)
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
