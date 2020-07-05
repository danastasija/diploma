import {MigrationInterface, QueryRunner} from "typeorm";

export class SalaryCascade1592857081432 implements MigrationInterface {
    name = 'SalaryCascade1592857081432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salary" DROP CONSTRAINT "FK_a26c2068c55307fcdbadbb96608"`, undefined);
        await queryRunner.query(`ALTER TABLE "salary" ADD CONSTRAINT "FK_a26c2068c55307fcdbadbb96608" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salary" DROP CONSTRAINT "FK_a26c2068c55307fcdbadbb96608"`, undefined);
        await queryRunner.query(`ALTER TABLE "salary" ADD CONSTRAINT "FK_a26c2068c55307fcdbadbb96608" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
