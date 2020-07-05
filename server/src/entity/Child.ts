import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Person } from "./Person";

@Entity()
export class Child {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 200 })
  childName: string;

  @Column("timestamp", { nullable: true })
  dob: Date;

  @ManyToOne((type) => Person, (person) => person.children, {
    onDelete: "CASCADE",
  })
  persons: Person[];
}
