import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { UserRole } from "./UserRole";
import { RolePermission } from "./RolePermisson";

@Entity()
export class Domain {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany((type) => UserRole, (role) => role.domains)
  roles: UserRole[];

  @OneToMany((type) => RolePermission, (role) => role.domain)
  permissions: RolePermission[];
}
