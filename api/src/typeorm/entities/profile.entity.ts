import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Profile extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'int' })
  age: number;
}
