import { DataSource } from 'typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

import entities from './entities';
import migrations from './migrations';

export const TypeOrmOptions: SqliteConnectionOptions = {
  type: 'sqlite',
  database: './db.sqlite',
  entities,
  migrations,
  migrationsRun: true,
};

export default new DataSource(TypeOrmOptions);
