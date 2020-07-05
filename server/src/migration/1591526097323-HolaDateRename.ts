import {MigrationInterface, QueryRunner} from "typeorm";

export class HolaDateRename1591526097323 implements MigrationInterface {
    name = 'HolaDateRename1591526097323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hola_date" DROP CONSTRAINT "FK_27743819797522f388711bfb819"`, undefined);
        await queryRunner.query(`ALTER TABLE "hola_date" RENAME COLUMN "holaDate" TO "date"`, undefined);
        await queryRunner.query(`ALTER TABLE "hola_date" ADD CONSTRAINT "FK_27743819797522f388711bfb819" FOREIGN KEY ("personsId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hola_date" DROP CONSTRAINT "FK_27743819797522f388711bfb819"`, undefined);
        await queryRunner.query(`ALTER TABLE "hola_date" RENAME COLUMN "date" TO "holaDate"`, undefined);
        await queryRunner.query(`ALTER TABLE "hola_date" ADD CONSTRAINT "FK_27743819797522f388711bfb819" FOREIGN KEY ("personsId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
