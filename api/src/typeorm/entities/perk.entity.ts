import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Perk extends BaseEntity {
  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty({ type: User, isArray: true })
  @ManyToMany(() => User, (user) => user.perks)
  @JoinTable({ name: 'perks_users' })
  users: User[];
}
