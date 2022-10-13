import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Profile extends BaseEntity {
  @Column({ type: 'int' })
  age: number;
}
