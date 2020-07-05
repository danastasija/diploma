import {MigrationInterface, QueryRunner} from "typeorm";

export class CascadeDeleteConstrain1591511101685 implements MigrationInterface {
    name = 'CascadeDeleteConstrain1591511101685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "child" DROP CONSTRAINT "FK_37360ba233b77c3451fae0e1571"`, undefined);
        await queryRunner.query(`ALTER TABLE "social_network" DROP CONSTRAINT "FK_13b984902d45bed8295418c849d"`, undefined);
        await queryRunner.query(`ALTER TABLE "additional_education" DROP CONSTRAINT "FK_a0d3f04251a955b89d5568e24ad"`, undefined);
        await queryRunner.query(`ALTER TABLE "previous_job" DROP CONSTRAINT "FK_d9179ae6b0725c9e7570420b4c3"`, undefined);
        await queryRunner.query(`ALTER TABLE "child" ADD CONSTRAINT "FK_37360ba233b77c3451fae0e1571" FOREIGN KEY ("personsId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "social_network" ADD CONSTRAINT "FK_13b984902d45bed8295418c849d" FOREIGN KEY ("personsId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "additional_education" ADD CONSTRAINT "FK_a0d3f04251a955b89d5568e24ad" FOREIGN KEY ("personsId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "previous_job" ADD CONSTRAINT "FK_d9179ae6b0725c9e7570420b4c3" FOREIGN KEY ("personsId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "previous_job" DROP CONSTRAINT "FK_d9179ae6b0725c9e7570420b4c3"`, undefined);
        await queryRunner.query(`ALTER TABLE "additional_education" DROP CONSTRAINT "FK_a0d3f04251a955b89d5568e24ad"`, undefined);
        await queryRunner.query(`ALTER TABLE "social_network" DROP CONSTRAINT "FK_13b984902d45bed8295418c849d"`, undefined);
        await queryRunner.query(`ALTER TABLE "child" DROP CONSTRAINT "FK_37360ba233b77c3451fae0e1571"`, undefined);
        await queryRunner.query(`ALTER TABLE "previous_job" ADD CONSTRAINT "FK_d9179ae6b0725c9e7570420b4c3" FOREIGN KEY ("personsId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "additional_education" ADD CONSTRAINT "FK_a0d3f04251a955b89d5568e24ad" FOREIGN KEY ("personsId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "social_network" ADD CONSTRAINT "FK_13b984902d45bed8295418c849d" FOREIGN KEY ("personsId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "child" ADD CONSTRAINT "FK_37360ba233b77c3451fae0e1571" FOREIGN KEY ("personsId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
