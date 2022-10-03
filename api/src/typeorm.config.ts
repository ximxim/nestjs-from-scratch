import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmOptions: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: './db.sqlite',
};
