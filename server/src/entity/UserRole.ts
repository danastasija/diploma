import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  BaseEntity,
  OneToMany,
  JoinTable,
  PrimaryColumn,
} from "typeorm";
import { User } from "./User";
import { Domain } from "./Domain";
import { RolePermission } from "./RolePermisson";

@Entity()
export class UserRole extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => User, (user) => user.roles)
  users: User[];

  @ManyToMany((type) => Domain, (domain) => domain.roles)
  @JoinTable()
  domains: Domain[];

  @OneToMany((type) => RolePermission, (permission) => permission.role)
  permissions: RolePermission[];
}
