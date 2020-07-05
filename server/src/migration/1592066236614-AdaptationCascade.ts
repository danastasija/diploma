import {MigrationInterface, QueryRunner} from "typeorm";

export class AdaptationCascade1592066236614 implements MigrationInterface {
    name = 'AdaptationCascade1592066236614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adaptation_file" DROP CONSTRAINT "FK_56886a47c07af31de79c4077c7b"`, undefined);
        await queryRunner.query(`ALTER TABLE "adaptation_file" ADD CONSTRAINT "FK_56886a47c07af31de79c4077c7b" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adaptation_file" DROP CONSTRAINT "FK_56886a47c07af31de79c4077c7b"`, undefined);
        await queryRunner.query(`ALTER TABLE "adaptation_file" ADD CONSTRAINT "FK_56886a47c07af31de79c4077c7b" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
