import {MigrationInterface, QueryRunner} from "typeorm";

export class UserRoleRelation1592662152553 implements MigrationInterface {
    name = 'UserRoleRelation1592662152553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_roles_user_role" ("userId" integer NOT NULL, "userRoleId" integer NOT NULL, CONSTRAINT "PK_cd5bf7bedcc5f7671f0a97b9224" PRIMARY KEY ("userId", "userRoleId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_dc94447a3cabad70eb2c96f5e1" ON "user_roles_user_role" ("userId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_4698620c2fcf96fdbabb09f384" ON "user_roles_user_role" ("userRoleId") `, undefined);
        await queryRunner.query(`CREATE TABLE "user_role_domains_domain" ("userRoleId" integer NOT NULL, "domainId" integer NOT NULL, CONSTRAINT "PK_505632146739dba30589c02ce09" PRIMARY KEY ("userRoleId", "domainId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_58735e24ac1d455f9ce5d82cdf" ON "user_role_domains_domain" ("userRoleId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_23a84ca28eceb1fd82eb790dae" ON "user_role_domains_domain" ("domainId") `, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles_user_role" ADD CONSTRAINT "FK_dc94447a3cabad70eb2c96f5e1d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles_user_role" ADD CONSTRAINT "FK_4698620c2fcf96fdbabb09f3844" FOREIGN KEY ("userRoleId") REFERENCES "user_role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_role_domains_domain" ADD CONSTRAINT "FK_58735e24ac1d455f9ce5d82cdf7" FOREIGN KEY ("userRoleId") REFERENCES "user_role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_role_domains_domain" ADD CONSTRAINT "FK_23a84ca28eceb1fd82eb790dae1" FOREIGN KEY ("domainId") REFERENCES "domain"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_role_domains_domain" DROP CONSTRAINT "FK_23a84ca28eceb1fd82eb790dae1"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_role_domains_domain" DROP CONSTRAINT "FK_58735e24ac1d455f9ce5d82cdf7"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles_user_role" DROP CONSTRAINT "FK_4698620c2fcf96fdbabb09f3844"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles_user_role" DROP CONSTRAINT "FK_dc94447a3cabad70eb2c96f5e1d"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_23a84ca28eceb1fd82eb790dae"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_58735e24ac1d455f9ce5d82cdf"`, undefined);
        await queryRunner.query(`DROP TABLE "user_role_domains_domain"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_4698620c2fcf96fdbabb09f384"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_dc94447a3cabad70eb2c96f5e1"`, undefined);
        await queryRunner.query(`DROP TABLE "user_roles_user_role"`, undefined);
    }

}
