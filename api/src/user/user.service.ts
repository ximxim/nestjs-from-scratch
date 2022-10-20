import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile, User } from '../typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private dataSource: DataSource,
  ) {}

  create(createUserDto: CreateUserDto) {
    const draftUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(draftUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.dataSource.transaction(async (manager) => {
      await manager.update(User, id, updateUserDto);
      return this.userRepository.findOne({ where: { id } });
    });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

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

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }
}
