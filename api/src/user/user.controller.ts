import { Controller, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JWTAuthGuard } from '../auth/jwt-auth-guard';
import { User } from '../typeorm';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Crud({
  model: {
    type: User,
  },
  query: {
    softDelete: true,
    exclude: ['password'],
    alwaysPaginate: true,
    limit: 2,
    join: {
      profile: {
        eager: true,
      },
    },
  },
  dto: {
    create: CreateUserDto,
    update: UpdateUserDto,
  },
  routes: {
    exclude: ['replaceOneBase', 'createManyBase'],
  },
})
@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
@UseGuards(JWTAuthGuard)
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
