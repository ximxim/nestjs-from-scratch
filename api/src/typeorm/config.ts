import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

import entities from './entities';

export const TypeOrmOptions: SqliteConnectionOptions = {
  type: 'sqlite',
  database: './db.sqlite',
  entities,
};
