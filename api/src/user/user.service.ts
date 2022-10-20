import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile, User } from 'src/typeorm';
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
    return this.userRepository.create(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
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
