import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { Person } from "./Person";
import { Position } from "./Position";
import { SalaryFile } from "./SalaryFiles";

@Entity()
export class Salary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  newSalary: number;

  @Column("timestamp")
  salaryDate: Date;

  @ManyToMany((type) => Position, (position) => position.salaries, {
    cascade: true,
  })
  @JoinTable()
  positions: Position[];

  @Column("timestamp")
  positionDate: Date;

  @Column({ nullable: true, length: 500 })
  comment: string;

  @ManyToOne((type) => Person, (person) => person.salaryHistory, {
    onDelete: "CASCADE",
  })
  person: Person;

  @OneToMany((type) => SalaryFile, (salaryFile) => salaryFile.salary, {
    nullable: true,
    cascade: true,
  })
  file: SalaryFile;

  @CreateDateColumn()
  createdAt: number;
}
