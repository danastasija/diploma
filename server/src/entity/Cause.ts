import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Person } from "./Person";

@Entity()
export class Cause {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @OneToMany((type) => Person, (person) => person.cause)
  persons: Person[];
}
