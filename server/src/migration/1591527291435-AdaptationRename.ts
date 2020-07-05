import {MigrationInterface, QueryRunner} from "typeorm";

export class AdaptationRename1591527291435 implements MigrationInterface {
    name = 'AdaptationRename1591527291435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" RENAME COLUMN "comentAdaptation" TO "adaptationSummary"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" RENAME COLUMN "adaptationSummary" TO "comentAdaptation"`, undefined);
    }

}
