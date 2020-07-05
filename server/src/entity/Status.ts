import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Person } from "./Person";

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @OneToMany((type) => Person, (person) => person.status)
  persons: Person[];
}
