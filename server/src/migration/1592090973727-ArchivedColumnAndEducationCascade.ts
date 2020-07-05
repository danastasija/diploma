import {MigrationInterface, QueryRunner} from "typeorm";

export class ArchivedColumnAndEducationCascade1592090973727 implements MigrationInterface {
    name = 'ArchivedColumnAndEducationCascade1592090973727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "education" DROP CONSTRAINT "FK_c3af39852d03a4ad7a5d4457909"`, undefined);
        await queryRunner.query(`ALTER TABLE "person" ADD "isArchived" boolean NOT NULL DEFAULT false`, undefined);
        await queryRunner.query(`ALTER TABLE "education" ADD CONSTRAINT "FK_c3af39852d03a4ad7a5d4457909" FOREIGN KEY ("personsId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "education" DROP CONSTRAINT "FK_c3af39852d03a4ad7a5d4457909"`, undefined);
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "isArchived"`, undefined);
        await queryRunner.query(`ALTER TABLE "education" ADD CONSTRAINT "FK_c3af39852d03a4ad7a5d4457909" FOREIGN KEY ("personsId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
