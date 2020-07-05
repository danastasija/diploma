import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Person } from "./Person";

@Entity()
export class PreviousJob {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  organization: string;

  @Column()
  workPeriod: string;

  @Column()
  position: string;

  @Column({ nullable: true })
  duties: string;

  @ManyToOne((type) => Person, (person) => person.previousJobs, {
    onDelete: "CASCADE",
  })
  persons: Person[];
}
