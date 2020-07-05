import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Status } from "./Status";
import { Skill } from "./Skill";
import { Position } from "./Position";
import { Child } from "./Child";
import { SocialNetwork } from "./SocialNetwork";
import { Education } from "./Education";
import { AdditionalEducation } from "./AdditionalEducation";
import { PreviousJob } from "./PreviousJob";
import { HolaDate } from "./HolaDate";
import { Salary } from "./Salary";
import { Cause } from "./Cause";
import { AdaptationFile } from "./AdaptationFiles";
import { DismissalFile } from "./DismissalFiles";

@Entity()
export class Person extends BaseEntity {
  //Общие данные
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: false, length: 200 })
  fullName: string;

  @Column("timestamp", { nullable: false })
  employmentDate: number;

  @Column({ nullable: false, type: "float", default: 0 })
  rate: number;

  @Column("timestamp")
  dob: number;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  workMail: string;

  @Column({ nullable: true })
  personalMail: string;

  @ManyToOne((type) => Status, (status) => status.persons, { nullable: false })
  status: Status;

  @ManyToMany((type) => Skill, (skill) => skill.persons, { nullable: true })
  @JoinTable()
  skills: Skill[];

  @ManyToMany((type) => Position, (position) => position.persons, {
    nullable: true,
  })
  @JoinTable()
  positions: Position[];

  //Дополинительные данные

  @Column({ nullable: true })
  familyStatus: number;

  @Column({ nullable: true })
  gender: number;

  @OneToMany((type) => Child, (child) => child.persons, {
    nullable: true,
    cascade: true,
  })
  children: Child;

  @Column({ nullable: true, length: 300 })
  address: string;

  @Column({ nullable: true })
  emergencyContact: string;

  @OneToMany(
    (type) => SocialNetwork,
    (socialNetwork) => socialNetwork.persons,
    { nullable: true, cascade: true }
  )
  socialNetworks: SocialNetwork;

  @OneToMany((type) => Education, (education) => education.persons, {
    nullable: true,
    cascade: true,
  })
  educations: Education;

  @OneToMany(
    (type) => AdditionalEducation,
    (additionalEducation) => additionalEducation.persons,
    { nullable: true, cascade: true }
  )
  additionalEducations: AdditionalEducation;

  @Column({ nullable: true })
  totalExperience: string;

  @OneToMany((type) => PreviousJob, (previousJob) => previousJob.persons, {
    nullable: true,
    cascade: true,
  })
  previousJobs: PreviousJob;

  @Column({ nullable: true, length: 200 })
  other: string;

  //ОФИС

  @Column({ nullable: true })
  cabinet: string;

  @Column({ nullable: true })
  workplace: string;

  @Column({ nullable: true })
  shoebox: string;

  @Column({ nullable: true })
  car: boolean;

  //Зарплата

  @OneToMany((type) => Salary, (salary) => salary.person, { nullable: true })
  salaryHistory: Salary[];

  //Адаптация
  @Column("timestamp", { nullable: true })
  probation: Date;

  @OneToMany(
    (type) => AdaptationFile,
    (adaptationFile) => adaptationFile.person,
    { nullable: true, cascade: true }
  )
  adaptationFiles: AdaptationFile;

  @ManyToOne((type) => Person, (id) => id.mentorpersons, { nullable: true })
  mentor: Person;

  @OneToMany((type) => Person, (person) => person.mentor, { nullable: true })
  mentorpersons: Person[];

  @ManyToOne((type) => Person, (id) => id.holapersons, { nullable: true })
  holaСonsultant: Person;

  @OneToMany((type) => Person, (person) => person.holaСonsultant, {
    nullable: true,
  })
  holapersons: Person[];

  @OneToMany((type) => HolaDate, (holaDate) => holaDate.persons, {
    nullable: true,
    cascade: true,
  })
  holaDates: HolaDate;

  @Column({ nullable: true })
  adaptationSummary: string;

  //Увольнение
  @Column("timestamp", { nullable: true })
  dateOfDismissal: Date;

  @ManyToOne((type) => Cause, (cause) => cause.persons, {
    nullable: true,
    cascade: true,
  })
  cause: Cause;

  @Column({ nullable: true })
  employer: string;

  @Column({ nullable: true, length: 500 })
  commentExit: string;

  @OneToMany((type) => DismissalFile, (dismissalFile) => dismissalFile.person, {
    nullable: true,
  })
  dismissalFile: DismissalFile;

  @Column({ default: false })
  isArchived: boolean;

  @UpdateDateColumn()
  updatedAt: number;

  @CreateDateColumn()
  createdAt: number;
}
