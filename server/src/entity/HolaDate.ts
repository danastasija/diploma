import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Person } from "./Person";

@Entity()
export class HolaDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("timestamp")
  date: string;

  @ManyToOne((type) => Person, (person) => person.holaDates, {
    onDelete: "CASCADE",
  })
  persons: Person[];
}
