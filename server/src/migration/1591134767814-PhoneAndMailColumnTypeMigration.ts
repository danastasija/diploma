import {MigrationInterface, QueryRunner} from "typeorm";

export class PhoneAndMailColumnTypeMigration1591134767814 implements MigrationInterface {
    name = 'PhoneAndMailColumnTypeMigration1591134767814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "phoneNumber"`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ADD "phoneNumber" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "workMail"`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ADD "workMail" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "personalMail"`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ADD "personalMail" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "personalMail"`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ADD "personalMail" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "workMail"`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ADD "workMail" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "phoneNumber"`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ADD "phoneNumber" integer`, undefined);
    }

}
