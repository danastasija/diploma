import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Person } from "./Person";
import { Salary } from "./Salary";

@Entity()
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @ManyToMany((type) => Person, (person) => person.positions)
  persons: Person[];

  @ManyToMany((type) => Salary, (salary) => salary.positions)
  salaries: Salary[];
}
