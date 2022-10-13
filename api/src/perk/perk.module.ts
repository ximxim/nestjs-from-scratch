import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerkService } from './perk.service';
import { Perk } from '../typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Perk])],
  providers: [PerkService],
  exports: [PerkService],
})
export class PerkModule {}
