import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameSalaryColumns1592075108344 implements MigrationInterface {
    name = 'RenameSalaryColumns1592075108344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salary" DROP COLUMN "salaryDates"`, undefined);
        await queryRunner.query(`ALTER TABLE "salary" DROP COLUMN "positionDates"`, undefined);
        await queryRunner.query(`ALTER TABLE "salary" ADD "salaryDate" TIMESTAMP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "salary" ADD "positionDate" TIMESTAMP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salary" DROP COLUMN "positionDate"`, undefined);
        await queryRunner.query(`ALTER TABLE "salary" DROP COLUMN "salaryDate"`, undefined);
        await queryRunner.query(`ALTER TABLE "salary" ADD "positionDates" TIMESTAMP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "salary" ADD "salaryDates" TIMESTAMP NOT NULL`, undefined);
    }

}
