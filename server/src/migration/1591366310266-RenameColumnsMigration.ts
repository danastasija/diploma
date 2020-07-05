import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameColumnsMigration1591366310266 implements MigrationInterface {
  name = "RenameColumnsMigration1591366310266";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "person" DROP COLUMN "gender"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "person" DROP COLUMN "emetgencyContact"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD "gender" integer`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD "emergencyContact" character varying`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "person" DROP COLUMN "emergencyContact"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "person" DROP COLUMN "gender"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD "emetgencyContact" character varying`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD "gender" integer`,
      undefined
    );
  }
}
