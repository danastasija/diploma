import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Person } from "./Person";

@Entity()
export class AdditionalEducation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameOfCourses: string;

  @Column({ nullable: true })
  organizer: string;

  @Column({ nullable: true })
  specialty: string;

  @Column()
  edingYears: string;

  @Column({ nullable: true })
  duration: string;

  @ManyToOne((type) => Person, (person) => person.additionalEducations, {
    onDelete: "CASCADE",
  })
  persons: Person[];
}
