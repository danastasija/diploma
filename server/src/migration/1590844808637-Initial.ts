import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1590844808637 implements MigrationInterface {
  name = "Initial1590844808637";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "status" ("id" SERIAL NOT NULL, "label" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "skill" ("id" SERIAL NOT NULL, "label" character varying NOT NULL, CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "salary_file" ("id" SERIAL NOT NULL, "path" character varying NOT NULL, "salaryId" integer, CONSTRAINT "PK_4107aa2e1558159f2e2779213b6" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "salary" ("id" SERIAL NOT NULL, "newSalary" integer NOT NULL, "salaryDates" TIMESTAMP NOT NULL, "positionDates" TIMESTAMP NOT NULL, "comment" character varying, "personId" integer, CONSTRAINT "PK_3ac75d9585433a6264e618a6503" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "position" ("id" SERIAL NOT NULL, "label" character varying NOT NULL, CONSTRAINT "PK_b7f483581562b4dc62ae1a5b7e2" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "child" ("id" SERIAL NOT NULL, "childName" character varying NOT NULL, "dob" TIMESTAMP, "personsId" integer, CONSTRAINT "PK_4609b9b323ca37c6bc435ec4b6b" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "social_network" ("id" SERIAL NOT NULL, "label" character varying NOT NULL, "link" character varying NOT NULL, "personsId" integer, CONSTRAINT "PK_db57ec926ad1d548459daae6491" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "education" ("id" SERIAL NOT NULL, "edInstitution" character varying NOT NULL, "periodOfStudy" character varying NOT NULL, "department" character varying, "specialty" character varying, "personsId" integer, CONSTRAINT "PK_bf3d38701b3030a8ad634d43bd6" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "additional_education" ("id" SERIAL NOT NULL, "nameOfCourses" character varying NOT NULL, "organizer" character varying, "specialty" character varying, "edingYears" character varying NOT NULL, "duration" character varying, "personsId" integer, CONSTRAINT "PK_1bbc35ef66e9c8e7721fe7e7283" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "previous_job" ("id" SERIAL NOT NULL, "organization" character varying NOT NULL, "workPeriod" character varying NOT NULL, "position" character varying NOT NULL, "duties" character varying, "personsId" integer, CONSTRAINT "PK_87a390cdf1b5f074fb85ca5d898" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "hola_date" ("id" SERIAL NOT NULL, "holaDate" TIMESTAMP NOT NULL, "personsId" integer, CONSTRAINT "PK_4db13ef3d84f1ffc390538753c0" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "cause" ("id" SERIAL NOT NULL, "label" character varying NOT NULL, CONSTRAINT "PK_7e5e70955edaf3bb0c56d8eeb49" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "dismissal_file" ("id" SERIAL NOT NULL, "path" character varying NOT NULL, "personId" integer, CONSTRAINT "PK_d20f024a83c6e03124fc16806c9" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "person" ("id" SERIAL NOT NULL, "Avatar" character varying, "fullName" character varying(200) NOT NULL, "employmentDate" TIMESTAMP, "rate" integer, "dob" TIMESTAMP NOT NULL, "phoneNumber" integer, "workMail" integer, "personalMail" integer, "familyStatus" integer, "gender" integer, "address" character varying, "emetgencyContact" character varying, "totalExperience" character varying, "other" character varying, "cabinet" character varying, "workplace" character varying, "shoebox" character varying, "car" integer, "probation" TIMESTAMP, "comentAdaptation" character varying, "dateOfDismissal" TIMESTAMP, "employer" character varying, "commentExit" character varying, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "statusId" integer, "mentorId" integer, "holaСonsultantId" integer, "causeId" integer, CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "adaptation_file" ("id" SERIAL NOT NULL, "path" character varying NOT NULL, "type" integer NOT NULL, "personId" integer, CONSTRAINT "PK_74a1c72509c2579325f371adbd6" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "salary_positions_position" ("salaryId" integer NOT NULL, "positionId" integer NOT NULL, CONSTRAINT "PK_e1b858c6fd374e20b5fef9be6c5" PRIMARY KEY ("salaryId", "positionId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_847bd8a3994ade92955c209971" ON "salary_positions_position" ("salaryId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d80d6d0cfe271e3f2c02a46814" ON "salary_positions_position" ("positionId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "person_skills_skill" ("personId" integer NOT NULL, "skillId" integer NOT NULL, CONSTRAINT "PK_d3db543ee73a4f85b80854a2b71" PRIMARY KEY ("personId", "skillId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_613d26dd961a9356cea0297f45" ON "person_skills_skill" ("personId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_171c7fa950b69d40f28913c51d" ON "person_skills_skill" ("skillId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "person_positions_position" ("personId" integer NOT NULL, "positionId" integer NOT NULL, CONSTRAINT "PK_a73bc39d2de0955acdda7b1adf9" PRIMARY KEY ("personId", "positionId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6b1ff329ba6d7bcd1adeaa81cd" ON "person_positions_position" ("personId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ea56a6452d69c04ae297721145" ON "person_positions_position" ("positionId") `,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "salary_file" ADD CONSTRAINT "FK_1a437b121ebc6291be7c1b197be" FOREIGN KEY ("salaryId") REFERENCES "salary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "salary" ADD CONSTRAINT "FK_a26c2068c55307fcdbadbb96608" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "child" ADD CONSTRAINT "FK_37360ba233b77c3451fae0e1571" FOREIGN KEY ("personsId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "social_network" ADD CONSTRAINT "FK_13b984902d45bed8295418c849d" FOREIGN KEY ("personsId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "education" ADD CONSTRAINT "FK_c3af39852d03a4ad7a5d4457909" FOREIGN KEY ("personsId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "additional_education" ADD CONSTRAINT "FK_a0d3f04251a955b89d5568e24ad" FOREIGN KEY ("personsId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "previous_job" ADD CONSTRAINT "FK_d9179ae6b0725c9e7570420b4c3" FOREIGN KEY ("personsId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "hola_date" ADD CONSTRAINT "FK_27743819797522f388711bfb819" FOREIGN KEY ("personsId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "dismissal_file" ADD CONSTRAINT "FK_28513c7d602f792b1c0630c7b15" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD CONSTRAINT "FK_bb39de9f03c550063515dc53d78" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD CONSTRAINT "FK_ccf9ea99c46a0516d9364233e74" FOREIGN KEY ("mentorId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD CONSTRAINT "FK_cdee7a931c084457481d15eaf50" FOREIGN KEY ("holaСonsultantId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "person" ADD CONSTRAINT "FK_427d1260c5e5887654eaf5ae1b6" FOREIGN KEY ("causeId") REFERENCES "cause"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "adaptation_file" ADD CONSTRAINT "FK_56886a47c07af31de79c4077c7b" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "salary_positions_position" ADD CONSTRAINT "FK_847bd8a3994ade92955c209971a" FOREIGN KEY ("salaryId") REFERENCES "salary"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "salary_positions_position" ADD CONSTRAINT "FK_d80d6d0cfe271e3f2c02a468140" FOREIGN KEY ("positionId") REFERENCES "position"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "person_skills_skill" ADD CONSTRAINT "FK_613d26dd961a9356cea0297f45e" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "person_skills_skill" ADD CONSTRAINT "FK_171c7fa950b69d40f28913c51d0" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "person_positions_position" ADD CONSTRAINT "FK_6b1ff329ba6d7bcd1adeaa81cda" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "person_positions_position" ADD CONSTRAINT "FK_ea56a6452d69c04ae297721145f" FOREIGN KEY ("positionId") REFERENCES "position"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "person_positions_position" DROP CONSTRAINT "FK_ea56a6452d69c04ae297721145f"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "person_positions_position" DROP CONSTRAINT "FK_6b1ff329ba6d7bcd1adeaa81cda"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "person_skills_skill" DROP CONSTRAINT "FK_171c7fa950b69d40f28913c51d0"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "person_skills_skill" DROP CONSTRAINT "FK_613d26dd961a9356cea0297f45e"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "salary_positions_position" DROP CONSTRAINT "FK_d80d6d0cfe271e3f2c02a468140"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "salary_positions_position" DROP CONSTRAINT "FK_847bd8a3994ade92955c209971a"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "adaptation_file" DROP CONSTRAINT "FK_56886a47c07af31de79c4077c7b"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "person" DROP CONSTRAINT "FK_427d1260c5e5887654eaf5ae1b6"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "person" DROP CONSTRAINT "FK_cdee7a931c084457481d15eaf50"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "person" DROP CONSTRAINT "FK_ccf9ea99c46a0516d9364233e74"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "person" DROP CONSTRAINT "FK_bb39de9f03c550063515dc53d78"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "dismissal_file" DROP CONSTRAINT "FK_28513c7d602f792b1c0630c7b15"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "hola_date" DROP CONSTRAINT "FK_27743819797522f388711bfb819"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "previous_job" DROP CONSTRAINT "FK_d9179ae6b0725c9e7570420b4c3"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "additional_education" DROP CONSTRAINT "FK_a0d3f04251a955b89d5568e24ad"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "education" DROP CONSTRAINT "FK_c3af39852d03a4ad7a5d4457909"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "social_network" DROP CONSTRAINT "FK_13b984902d45bed8295418c849d"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "child" DROP CONSTRAINT "FK_37360ba233b77c3451fae0e1571"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "salary" DROP CONSTRAINT "FK_a26c2068c55307fcdbadbb96608"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "salary_file" DROP CONSTRAINT "FK_1a437b121ebc6291be7c1b197be"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_ea56a6452d69c04ae297721145"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_6b1ff329ba6d7bcd1adeaa81cd"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "person_positions_position"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_171c7fa950b69d40f28913c51d"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_613d26dd961a9356cea0297f45"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "person_skills_skill"`, undefined);
    await queryRunner.query(
      `DROP INDEX "IDX_d80d6d0cfe271e3f2c02a46814"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_847bd8a3994ade92955c209971"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "salary_positions_position"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "adaptation_file"`, undefined);
    await queryRunner.query(`DROP TABLE "person"`, undefined);
    await queryRunner.query(`DROP TABLE "dismissal_file"`, undefined);
    await queryRunner.query(`DROP TABLE "cause"`, undefined);
    await queryRunner.query(`DROP TABLE "hola_date"`, undefined);
    await queryRunner.query(`DROP TABLE "previous_job"`, undefined);
    await queryRunner.query(`DROP TABLE "additional_education"`, undefined);
    await queryRunner.query(`DROP TABLE "education"`, undefined);
    await queryRunner.query(`DROP TABLE "social_network"`, undefined);
    await queryRunner.query(`DROP TABLE "child"`, undefined);
    await queryRunner.query(`DROP TABLE "position"`, undefined);
    await queryRunner.query(`DROP TABLE "salary"`, undefined);
    await queryRunner.query(`DROP TABLE "salary_file"`, undefined);
    await queryRunner.query(`DROP TABLE "skill"`, undefined);
    await queryRunner.query(`DROP TABLE "status"`, undefined);
  }
}
