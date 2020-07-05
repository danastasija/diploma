import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Salary } from "./Salary";

@Entity()
export class SalaryFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @ManyToOne((type) => Salary, (salary) => salary.file)
  salary: Salary;
}
