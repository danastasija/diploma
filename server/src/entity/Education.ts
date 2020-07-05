import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Person } from "./Person";

@Entity()
export class Education {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  edInstitution: string;

  @Column()
  periodOfStudy: string;

  @Column({ nullable: true })
  department: string;

  @Column({ nullable: true })
  specialty: string;

  @ManyToOne((type) => Person, (person) => person.educations, {
    onDelete: "CASCADE",
  })
  persons: Person[];
}
