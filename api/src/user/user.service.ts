import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../typeorm';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    const dbUser = await this.userRepository.findOneBy({ username: 'john' });
    if (dbUser) return;
    const draftUser = this.userRepository.create({
      username: 'john',
      password: 'changeme',
    });
    await this.userRepository.save(draftUser);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }
}
