import {MigrationInterface, QueryRunner} from "typeorm";

export class SalaryCreatedDate1592075302265 implements MigrationInterface {
    name = 'SalaryCreatedDate1592075302265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salary" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salary" DROP COLUMN "createdAt"`, undefined);
    }

}
