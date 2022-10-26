import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Recommomendation extends BaseEntity {
  @ApiProperty()
  @Column()
  description: string;

  // @ApiProperty({ type: User })
  @ManyToOne(() => User, (user) => user.recommomendations)
  user: User;

  @ApiProperty()
  @Column()
  userId: number;
}
