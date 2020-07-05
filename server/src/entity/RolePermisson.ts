import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { UserRole } from "./UserRole";
import { Domain } from "./Domain";

@Entity()
export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "r" })
  access: "r" | "w" | "rw";

  @ManyToOne((type) => UserRole, (role) => role.permissions, {
    onDelete: "CASCADE",
  })
  role: UserRole;

  @Column({ nullable: true })
  roleId: number;

  @ManyToOne((type) => Domain, (domain) => domain.permissions, {
    onDelete: "CASCADE",
  })
  domain: Domain;

  @Column({ nullable: true })
  domainId: number;
}
