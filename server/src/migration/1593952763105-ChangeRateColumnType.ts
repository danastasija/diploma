import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeRateColumnType1593952763105 implements MigrationInterface {
    name = 'ChangeRateColumnType1593952763105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "rate"`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ADD "rate" double precision NOT NULL DEFAULT 0`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "rate"`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ADD "rate" integer NOT NULL DEFAULT 0`, undefined);
    }

}
