import { MigrationInterface, QueryRunner } from "typeorm";

export class init1665676879837 implements MigrationInterface {
    name = 'init1665676879837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "perk" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "description" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "perks_users" ("perkId" integer NOT NULL, "userId" integer NOT NULL, PRIMARY KEY ("perkId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e913c61985014a64d2716d00cd" ON "perks_users" ("perkId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f05758bd819d618363e3332d07" ON "perks_users" ("userId") `);
        await queryRunner.query(`DROP INDEX "IDX_e913c61985014a64d2716d00cd"`);
        await queryRunner.query(`DROP INDEX "IDX_f05758bd819d618363e3332d07"`);
        await queryRunner.query(`CREATE TABLE "temporary_perks_users" ("perkId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "FK_e913c61985014a64d2716d00cdb" FOREIGN KEY ("perkId") REFERENCES "perk" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_f05758bd819d618363e3332d07d" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("perkId", "userId"))`);
        await queryRunner.query(`INSERT INTO "temporary_perks_users"("perkId", "userId") SELECT "perkId", "userId" FROM "perks_users"`);
        await queryRunner.query(`DROP TABLE "perks_users"`);
        await queryRunner.query(`ALTER TABLE "temporary_perks_users" RENAME TO "perks_users"`);
        await queryRunner.query(`CREATE INDEX "IDX_e913c61985014a64d2716d00cd" ON "perks_users" ("perkId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f05758bd819d618363e3332d07" ON "perks_users" ("userId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_f05758bd819d618363e3332d07"`);
        await queryRunner.query(`DROP INDEX "IDX_e913c61985014a64d2716d00cd"`);
        await queryRunner.query(`ALTER TABLE "perks_users" RENAME TO "temporary_perks_users"`);
        await queryRunner.query(`CREATE TABLE "perks_users" ("perkId" integer NOT NULL, "userId" integer NOT NULL, PRIMARY KEY ("perkId", "userId"))`);
        await queryRunner.query(`INSERT INTO "perks_users"("perkId", "userId") SELECT "perkId", "userId" FROM "temporary_perks_users"`);
        await queryRunner.query(`DROP TABLE "temporary_perks_users"`);
        await queryRunner.query(`CREATE INDEX "IDX_f05758bd819d618363e3332d07" ON "perks_users" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e913c61985014a64d2716d00cd" ON "perks_users" ("perkId") `);
        await queryRunner.query(`DROP INDEX "IDX_f05758bd819d618363e3332d07"`);
        await queryRunner.query(`DROP INDEX "IDX_e913c61985014a64d2716d00cd"`);
        await queryRunner.query(`DROP TABLE "perks_users"`);
        await queryRunner.query(`DROP TABLE "perk"`);
    }

}
