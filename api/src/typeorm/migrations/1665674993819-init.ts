import { MigrationInterface, QueryRunner } from "typeorm";

export class init1665674993819 implements MigrationInterface {
    name = 'init1665674993819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "isActive" boolean NOT NULL DEFAULT (1), "phone" varchar, "dob" date, "daysActive" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "username", "password", "createdAt", "updatedAt", "deletedAt") SELECT "id", "username", "password", "createdAt", "updatedAt", "deletedAt" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime)`);
        await queryRunner.query(`INSERT INTO "user"("id", "username", "password", "createdAt", "updatedAt", "deletedAt") SELECT "id", "username", "password", "createdAt", "updatedAt", "deletedAt" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
