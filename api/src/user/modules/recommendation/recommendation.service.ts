import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Recommomendation } from '../../../typeorm';

@Injectable()
export class RecommendationService extends TypeOrmCrudService<Recommomendation> {
  constructor(@InjectRepository(Recommomendation) repo) {
    super(repo);
  }
}
