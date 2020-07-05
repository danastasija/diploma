import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Person } from "./Person";

@Entity()
export class SocialNetwork {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  link: string;

  @ManyToOne((type) => Person, (person) => person.socialNetworks, {
    onDelete: "CASCADE",
  })
  persons: Person[];
}
