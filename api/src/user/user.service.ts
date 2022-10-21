import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Profile, User } from '../typeorm';

@Injectable()
export class UserService
  extends TypeOrmCrudService<User>
  implements OnModuleInit
{
  constructor(
    @InjectRepository(User) repo,
    private dataSource: DataSource,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {
    super(repo);
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.repo.findOneBy({ username });
  }

  async onModuleInit() {
    const dbUser = await this.repo.findOneBy({ username: 'john' });
    if (dbUser) return;

    await this.dataSource.transaction(async (manager) => {
      const draftProfile = this.profileRepository.create({ age: 19 });
      const dbProfile = await manager.save(draftProfile);
      const draftUser = this.repo.create({
        username: 'john',
        password: 'changeme',
        profile: dbProfile,
      });
      await manager.save(draftUser);
    });
  }
}
