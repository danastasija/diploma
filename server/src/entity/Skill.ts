import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Person } from "./Person";

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @ManyToMany((type) => Person, (person) => person.skills)
  persons: Person[];
}
