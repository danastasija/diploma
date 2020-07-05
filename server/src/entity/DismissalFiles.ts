import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Person } from "./Person";

@Entity()
export class DismissalFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @ManyToOne((type) => Person, (person) => person.dismissalFile)
  person: Person;
}
