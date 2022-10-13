import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Recommomendation } from './recommomendation.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  phone?: string;

  @Column({ type: 'date', nullable: true })
  dob?: Date;

  @Column({ nullable: true })
  daysActive?: number;

  @OneToMany(
    () => Recommomendation,
    (recommomendation) => recommomendation.user,
  )
  recommomendations: Recommomendation[];
}
