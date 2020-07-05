import {MigrationInterface, QueryRunner} from "typeorm";

export class RoleAndDomainDisableIncrement1592860592064 implements MigrationInterface {
    name = 'RoleAndDomainDisableIncrement1592860592064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3130a39c1e4a740d044e685730"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles_user_role" DROP CONSTRAINT "FK_4698620c2fcf96fdbabb09f3844"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_role_domains_domain" DROP CONSTRAINT "FK_58735e24ac1d455f9ce5d82cdf7"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_role" ALTER COLUMN "id" DROP DEFAULT`, undefined);
        await queryRunner.query(`DROP SEQUENCE "user_role_id_seq"`, undefined);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_6a28cebf8b7b5691554c90d2e2f"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_role_domains_domain" DROP CONSTRAINT "FK_23a84ca28eceb1fd82eb790dae1"`, undefined);
        await queryRunner.query(`ALTER TABLE "domain" ALTER COLUMN "id" DROP DEFAULT`, undefined);
        await queryRunner.query(`DROP SEQUENCE "domain_id_seq"`, undefined);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3130a39c1e4a740d044e685730" FOREIGN KEY ("roleId") REFERENCES "user_role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_6a28cebf8b7b5691554c90d2e2f" FOREIGN KEY ("domainId") REFERENCES "domain"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles_user_role" ADD CONSTRAINT "FK_4698620c2fcf96fdbabb09f3844" FOREIGN KEY ("userRoleId") REFERENCES "user_role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_role_domains_domain" ADD CONSTRAINT "FK_58735e24ac1d455f9ce5d82cdf7" FOREIGN KEY ("userRoleId") REFERENCES "user_role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_role_domains_domain" ADD CONSTRAINT "FK_23a84ca28eceb1fd82eb790dae1" FOREIGN KEY ("domainId") REFERENCES "domain"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_role_domains_domain" DROP CONSTRAINT "FK_23a84ca28eceb1fd82eb790dae1"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_role_domains_domain" DROP CONSTRAINT "FK_58735e24ac1d455f9ce5d82cdf7"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles_user_role" DROP CONSTRAINT "FK_4698620c2fcf96fdbabb09f3844"`, undefined);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_6a28cebf8b7b5691554c90d2e2f"`, undefined);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3130a39c1e4a740d044e685730"`, undefined);
        await queryRunner.query(`CREATE SEQUENCE "domain_id_seq" OWNED BY "domain"."id"`, undefined);
        await queryRunner.query(`ALTER TABLE "domain" ALTER COLUMN "id" SET DEFAULT nextval('domain_id_seq')`, undefined);
        await queryRunner.query(`ALTER TABLE "user_role_domains_domain" ADD CONSTRAINT "FK_23a84ca28eceb1fd82eb790dae1" FOREIGN KEY ("domainId") REFERENCES "domain"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_6a28cebf8b7b5691554c90d2e2f" FOREIGN KEY ("domainId") REFERENCES "domain"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`CREATE SEQUENCE "user_role_id_seq" OWNED BY "user_role"."id"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_role" ALTER COLUMN "id" SET DEFAULT nextval('user_role_id_seq')`, undefined);
        await queryRunner.query(`ALTER TABLE "user_role_domains_domain" ADD CONSTRAINT "FK_58735e24ac1d455f9ce5d82cdf7" FOREIGN KEY ("userRoleId") REFERENCES "user_role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles_user_role" ADD CONSTRAINT "FK_4698620c2fcf96fdbabb09f3844" FOREIGN KEY ("userRoleId") REFERENCES "user_role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3130a39c1e4a740d044e685730" FOREIGN KEY ("roleId") REFERENCES "user_role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

}
