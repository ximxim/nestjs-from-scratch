import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { RecommendationService } from './recommendation.service';

import { Recommomendation } from '../../../typeorm';
import { JWTAuthGuard } from '../../../auth/jwt-auth-guard';

@Crud({
  model: {
    type: Recommomendation,
  },
  query: {
    softDelete: true,
    alwaysPaginate: true,
    join: {
      user: {
        eager: true,
      },
    },
  },
  params: {
    userId: {
      field: 'userId',
      type: 'number',
    },
  },
  routes: {
    exclude: ['replaceOneBase', 'createManyBase'],
  },
})
@ApiTags('recommomendation')
// @ApiBearerAuth()
@Controller('user/:userId/recommomendation')
// @UseGuards(JWTAuthGuard)
export class RecommendationController
  implements CrudController<Recommomendation>
{
  constructor(public service: RecommendationService) {}
}
