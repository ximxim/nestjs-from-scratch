import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Perk } from '../typeorm';

@Injectable()
export class PerkService implements OnModuleInit {
  constructor(
    @InjectRepository(Perk)
    private readonly perkRepository: Repository<Perk>,
  ) {}

  async onModuleInit() {
    const perks = ['salary', 'benefits'];

    for (const description of perks) {
      const dbPerk = await this.perkRepository.findOne({
        where: { description },
      });

      if (dbPerk) return;

      const perk = this.perkRepository.create({ description });

      await this.perkRepository.save(perk);
    }
  }
}
