import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Person } from "./Person";

@Entity()
export class AdaptationFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @ManyToOne((type) => Person, (person) => person.adaptationFiles, {
    onDelete: "CASCADE",
  })
  person: Person;

  @Column()
  type: number;
}
