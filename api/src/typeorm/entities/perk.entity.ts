import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Perk extends BaseEntity {
  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user.perks)
  @JoinTable({ name: 'perks_users' })
  users: User[];
}
