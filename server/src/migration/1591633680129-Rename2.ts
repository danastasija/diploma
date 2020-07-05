import {MigrationInterface, QueryRunner} from "typeorm";

export class Rename21591633680129 implements MigrationInterface {
    name = 'Rename21591633680129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" RENAME COLUMN "emetgencyContact" TO "emergencyContact"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" RENAME COLUMN "emergencyContact" TO "emetgencyContact"`, undefined);
    }

}
