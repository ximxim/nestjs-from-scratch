import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User, Profile } from '../typeorm';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private dataSource: DataSource,
  ) {}

  async onModuleInit() {
    const dbUser = await this.userRepository.findOneBy({ username: 'john' });
    if (dbUser) return;

    await this.dataSource.transaction(async (manager) => {
      const draftProfile = this.profileRepository.create({ age: 19 });
      const dbProfile = await manager.save(draftProfile);
      const draftUser = this.userRepository.create({
        username: 'john',
        password: 'changeme',
        profile: dbProfile,
      });
      await manager.save(draftUser);
    });
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }
}
