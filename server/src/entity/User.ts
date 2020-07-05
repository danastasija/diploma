import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToMany,
  Index,
  JoinTable,
} from "typeorm";
import * as argon2 from "argon2";
import { UserRole } from "./UserRole";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  login: string;

  @Column()
  password: string;

  @Column({ nullable: false })
  fullName: string;

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  updateAt: number;

  @Column({ default: false })
  isAdmin: boolean;

  @ManyToMany((type) => UserRole, (role) => role.users, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  roles: UserRole[];

  @BeforeInsert()
  async hashPassowrd() {
    this.password = await argon2.hash(this.password);
  }
}
