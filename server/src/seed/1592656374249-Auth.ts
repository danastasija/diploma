import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User } from "../entity/User";
import * as argon2 from "argon2";
import { UserRole } from "../entity/UserRole";
import { Domain } from "../entity/Domain";
import { RolePermission } from "../entity/RolePermisson";
const password = "v8Wrpzrggf";

export class Auth1592656374249 implements MigrationInterface {
  name = "Auth1592656374249";

  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = getRepository(User, "seed");
    const roleRepository = await getRepository(UserRole, "seed");
    const permissionRepository = await getRepository(RolePermission, "seed");

    // generate admin
    const admin = new User();
    admin.login = "admin";
    admin.password = password;
    admin.isAdmin = true;
    admin.fullName = "Aдминистратор";
    userRepository.save(admin);
    // generate admin

    const RoleDomainRelation: {
      [key: string]: ({ name: string } & Partial<
        Pick<RolePermission, "access">
      >)[];
    } = {
      "Лид-линк": [
        { name: "Общие данные" },
        { name: "Дополнительные данные" },
        { name: "Зарплата" },
        { name: "Офис" },
        { name: "Адаптация" },
        { name: "Увольнение" },
      ],
      "Генеральный директор": [
        { name: "Общие данные" },
        { name: "Дополнительные данные" },
        { name: "Зарплата" },
        { name: "Офис" },
        { name: "Адаптация" },
        { name: "Увольнение" },
      ],
      "Зам. ГД": [
        { name: "Общие данные" },
        { name: "Дополнительные данные" },
        { name: "Зарплата" },
        { name: "Офис" },
        { name: "Адаптация" },
        { name: "Увольнение" },
      ],
      Зарплата: [
        { name: "Общие данные" },
        { name: "Дополнительные данные" },
        { name: "Зарплата", access: "w" },
        { name: "Офис" },
      ],
      "Приема на работу": [
        { name: "Общие данные", access: "w" },
        { name: "Дополнительные данные", access: "w" },
        { name: "Офис" },
      ],
      Кадры: [
        { name: "Общие данные", access: "w" },
        { name: "Дополнительные данные", access: "w" },
        { name: "Офис" },
        { name: "Увольнение" },
      ],
      Адаптация: [
        { name: "Общие данные" },
        { name: "Дополнительные данные" },
        { name: "Офис" },
        { name: "Адаптация", access: "w" },
      ],
      Увольнение: [
        { name: "Общие данные" },
        { name: "Дополнительные данные" },
        { name: "Офис" },
        { name: "Увольнение", access: "w" },
      ],
      Офис: [
        { name: "Общие данные" },
        { name: "Дополнительные данные" },
        { name: "Офис", access: "w" },
      ],
      "Продвижение HR-бренда": [
        { name: "Общие данные" },
        { name: "Дополнительные данные" },
        { name: "Офис" },
      ],
    };
    const domains = await getRepository(Domain, "seed").save([
      { id: 1, name: "Общие данные" },
      { id: 2, name: "Дополнительные данные" },
      { id: 3, name: "Офис" },
      { id: 4, name: "Зарплата" },
      { id: 5, name: "Адаптация" },
      { id: 6, name: "Увольнение" },
    ]);
    const roles = await roleRepository.save([
      { id: 1, name: "Лид-линк" },
      { id: 2, name: "Генеральный директор" },
      { id: 3, name: "Зам. ГД" },
      { id: 4, name: "Зарплата" },
      { id: 5, name: "Приема на работу" },
      { id: 6, name: "Кадры" },
      { id: 7, name: "Адаптация" },
      { id: 8, name: "Увольнение" },
      { id: 9, name: "Офис" },
      { id: 10, name: "Продвижение HR-бренда" },
    ]);
    for (const role of roles) {
      await roleRepository
        .createQueryBuilder("role")
        .relation("domains")
        .of(role)
        .add(
          RoleDomainRelation[role.name].map((v) =>
            domains.find((d) => d.name === v.name)
          )
        );
      await permissionRepository.save(
        RoleDomainRelation[role.name].map((v) => ({
          role,
          access: v.access,
          domain: domains.find((d) => d.name === v.name),
        }))
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
