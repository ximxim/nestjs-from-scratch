import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { Recommomendation } from '../../../typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Recommomendation])],
  controllers: [RecommendationController],
  providers: [RecommendationService],
  exports: [RecommendationService],
})
export class RecommendationModule {}
