import { MigrationInterface, QueryRunner } from "typeorm";

export class init1665677585363 implements MigrationInterface {
    name = 'init1665677585363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profile" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "age" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "isActive" boolean NOT NULL DEFAULT (1), "phone" varchar, "dob" date, "daysActive" integer, "profileId" integer, CONSTRAINT "UQ_fe4ec24a49c8ab53289320a6841" UNIQUE ("profileId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "username", "password", "createdAt", "updatedAt", "deletedAt", "isActive", "phone", "dob", "daysActive") SELECT "id", "username", "password", "createdAt", "updatedAt", "deletedAt", "isActive", "phone", "dob", "daysActive" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "isActive" boolean NOT NULL DEFAULT (1), "phone" varchar, "dob" date, "daysActive" integer, "profileId" integer, CONSTRAINT "UQ_fe4ec24a49c8ab53289320a6841" UNIQUE ("profileId"), CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "profile" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "username", "password", "createdAt", "updatedAt", "deletedAt", "isActive", "phone", "dob", "daysActive", "profileId") SELECT "id", "username", "password", "createdAt", "updatedAt", "deletedAt", "isActive", "phone", "dob", "daysActive", "profileId" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "isActive" boolean NOT NULL DEFAULT (1), "phone" varchar, "dob" date, "daysActive" integer, "profileId" integer, CONSTRAINT "UQ_fe4ec24a49c8ab53289320a6841" UNIQUE ("profileId"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "username", "password", "createdAt", "updatedAt", "deletedAt", "isActive", "phone", "dob", "daysActive", "profileId") SELECT "id", "username", "password", "createdAt", "updatedAt", "deletedAt", "isActive", "phone", "dob", "daysActive", "profileId" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "isActive" boolean NOT NULL DEFAULT (1), "phone" varchar, "dob" date, "daysActive" integer)`);
        await queryRunner.query(`INSERT INTO "user"("id", "username", "password", "createdAt", "updatedAt", "deletedAt", "isActive", "phone", "dob", "daysActive") SELECT "id", "username", "password", "createdAt", "updatedAt", "deletedAt", "isActive", "phone", "dob", "daysActive" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`DROP TABLE "profile"`);
    }

}
