import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameAvatar1592047355573 implements MigrationInterface {
    name = 'RenameAvatar1592047355573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" RENAME COLUMN "Avatar" TO "avatar"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person" RENAME COLUMN "avatar" TO "Avatar"`, undefined);
    }

}
