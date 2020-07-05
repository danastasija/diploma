import {MigrationInterface, QueryRunner} from "typeorm";

export class Auth1592661366951 implements MigrationInterface {
    name = 'Auth1592661366951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "fullName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a62473490b3e4578fd683235c5" ON "user" ("login") `, undefined);
        await queryRunner.query(`CREATE TABLE "role_permission" ("id" SERIAL NOT NULL, "access" character varying NOT NULL DEFAULT 'r', "roleId" integer, "domainId" integer, CONSTRAINT "PK_96c8f1fd25538d3692024115b47" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user_role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "domain" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_26a07113f90df161f919c7d5a65" UNIQUE ("name"), CONSTRAINT "PK_27e3ec3ea0ae02c8c5bceab3ba9" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3130a39c1e4a740d044e685730" FOREIGN KEY ("roleId") REFERENCES "user_role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "role_permission" ADD CONSTRAINT "FK_6a28cebf8b7b5691554c90d2e2f" FOREIGN KEY ("domainId") REFERENCES "domain"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_6a28cebf8b7b5691554c90d2e2f"`, undefined);
        await queryRunner.query(`ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3130a39c1e4a740d044e685730"`, undefined);
        await queryRunner.query(`DROP TABLE "domain"`, undefined);
        await queryRunner.query(`DROP TABLE "user_role"`, undefined);
        await queryRunner.query(`DROP TABLE "role_permission"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_a62473490b3e4578fd683235c5"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}
