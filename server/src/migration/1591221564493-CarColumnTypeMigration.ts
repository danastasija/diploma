import {MigrationInterface, QueryRunner} from "typeorm";

export class CarColumnTypeMigration1591221564493 implements MigrationInterface {
    name = 'CarColumnTypeMigration1591221564493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "car"`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ADD "car" boolean`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "car"`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ADD "car" integer`, undefined);
    }

}
