import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Recommomendation extends BaseEntity {
  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.recommomendations)
  user: User;
}
