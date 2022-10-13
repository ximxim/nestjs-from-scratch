import { MigrationInterface, QueryRunner } from "typeorm";

export class init1665676312413 implements MigrationInterface {
    name = 'init1665676312413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recommomendation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "description" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_recommomendation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "description" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_555559140609fd0b3184c4588d2" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_recommomendation"("id", "createdAt", "updatedAt", "deletedAt", "description", "userId") SELECT "id", "createdAt", "updatedAt", "deletedAt", "description", "userId" FROM "recommomendation"`);
        await queryRunner.query(`DROP TABLE "recommomendation"`);
        await queryRunner.query(`ALTER TABLE "temporary_recommomendation" RENAME TO "recommomendation"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recommomendation" RENAME TO "temporary_recommomendation"`);
        await queryRunner.query(`CREATE TABLE "recommomendation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "description" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "recommomendation"("id", "createdAt", "updatedAt", "deletedAt", "description", "userId") SELECT "id", "createdAt", "updatedAt", "deletedAt", "description", "userId" FROM "temporary_recommomendation"`);
        await queryRunner.query(`DROP TABLE "temporary_recommomendation"`);
        await queryRunner.query(`DROP TABLE "recommomendation"`);
    }

}
