import {MigrationInterface, QueryRunner} from "typeorm";

export class Validation1591631350889 implements MigrationInterface {
    name = 'Validation1591631350889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "emergencyContact"`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ADD "emetgencyContact" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "salary" DROP COLUMN "comment"`, undefined);
        await queryRunner.query(`ALTER TABLE "salary" ADD "comment" character varying(500)`, undefined);
        await queryRunner.query(`ALTER TABLE "child" DROP COLUMN "childName"`, undefined);
        await queryRunner.query(`ALTER TABLE "child" ADD "childName" character varying(200) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_bb39de9f03c550063515dc53d78"`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ALTER COLUMN "employmentDate" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ALTER COLUMN "rate" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "address"`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ADD "address" character varying(300)`, undefined);
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "other"`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ADD "other" character varying(200)`, undefined);
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "commentExit"`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ADD "commentExit" character varying(500)`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ALTER COLUMN "statusId" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_bb39de9f03c550063515dc53d78" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_bb39de9f03c550063515dc53d78"`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ALTER COLUMN "statusId" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "commentExit"`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ADD "commentExit" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "other"`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ADD "other" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "address"`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ADD "address" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ALTER COLUMN "rate" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ALTER COLUMN "employmentDate" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_bb39de9f03c550063515dc53d78" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "child" DROP COLUMN "childName"`, undefined);
        await queryRunner.query(`ALTER TABLE "child" ADD "childName" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "salary" DROP COLUMN "comment"`, undefined);
        await queryRunner.query(`ALTER TABLE "salary" ADD "comment" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "emetgencyContact"`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ADD "emergencyContact" character varying`, undefined);
    }

}
