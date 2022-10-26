import { Logger as NestLogger } from '@nestjs/common';
import { DataSource, Logger as TypeOrmLogger } from 'typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

import entities from './entities';
import migrations from './migrations';

class DatabaseLogger implements TypeOrmLogger {
  private readonly logger = new NestLogger('SQL');

  logQuery(query: string, parameters?: unknown[]) {
    this.logger.verbose(
      `${query} -- Parameters: ${this.stringifyParameters(parameters)}`,
    );
  }

  logQueryError(error: string, query: string, parameters?: unknown[]) {
    this.logger.error(
      `${query} -- Parameters: ${this.stringifyParameters(
        parameters,
      )} -- ${error}`,
    );
  }

  logQuerySlow(time: number, query: string, parameters?: unknown[]) {
    this.logger.warn(
      `Time: ${time} -- Parameters: ${this.stringifyParameters(
        parameters,
      )} -- ${query}`,
    );
  }

  logMigration(message: string) {
    this.logger.verbose(message);
  }

  logSchemaBuild(message: string) {
    this.logger.verbose(message);
  }

  log(level: 'log' | 'info' | 'warn', message: string) {
    if (level === 'log') {
      return this.logger.verbose(message);
    }
    if (level === 'info') {
      return this.logger.verbose(message);
    }
    if (level === 'warn') {
      return this.logger.warn(message);
    }
  }

  private stringifyParameters(parameters?: unknown[]) {
    try {
      return JSON.stringify(parameters);
    } catch {
      return '';
    }
  }
}

export const TypeOrmOptions: SqliteConnectionOptions = {
  type: 'sqlite',
  database: './db.sqlite',
  entities,
  migrations,
  migrationsRun: true,
  logging: true,
  logger: new DatabaseLogger(),
};

export default new DataSource(TypeOrmOptions);
