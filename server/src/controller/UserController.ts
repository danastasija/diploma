import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { NotFoundError, BaseError, BadRequestError } from "../Errors";
import { RolePermission } from "../entity/RolePermisson";

class UserController {
  async getProfile(req: Request, res: Response, next) {
    try {
      const user = await getRepository(User).findOne(req.user.data.id, {});
      if (!user) {
        throw new NotFoundError();
      }
      const { password, ...publicData } = user;
      const permissions = user.roles.length
        ? await getRepository(RolePermission)
            .createQueryBuilder("pr")
            .leftJoin("pr.domain", "domain")
            .leftJoin("pr.role", "role")
            .select(["pr.access", "pr.domainId"])
            .where("role.id IN (:...roles)", {
              roles: user.roles.map((r) => r.id),
            })
            .getMany()
        : [];
      res.status(200).json({ ...publicData, permissions });
    } catch (error) {
      next(error);
    }
  }
  async getUsers(req: Request, res: Response, next) {
    try {
      let query = getRepository(User)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.roles", "roles");
      if (
        typeof req.query.searchText === "string" &&
        req.query.searchText.trim()
      ) {
        query = query
          .where("user.fullName LIKE :searchText")
          .orWhere("user.login LIKE :searchText");
      }

      const users = await query
        .setParameters({ searchText: `%${req.query.searchText}%` })
        .getMany();

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const newUser = new User();
      Object.assign(newUser, req.body);
      const result = await getRepository(User).save(newUser);
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json(error);
    }
  }

  async update({ body }: Request, res: Response, next: NextFunction) {
    if (!body.id) {
      throw new BadRequestError("Не указан userId");
    }
    try {
      const user = await getRepository(User).findOne(body.id);
      if (!user) {
        throw new NotFoundError(`Пользователь с id ${body.id} не найден`);
      }
      await getRepository(User).save(body);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }

  async changePassword(
    { body: { id, password } },
    res: Response,
    next: NextFunction
  ) {
    if (!id) {
      throw new BadRequestError("Не указан userId");
    }
    try {
      const user = await getRepository(User).findOne(id);
      if (!user) {
        throw new NotFoundError(`Пользователь с id ${id} не найден`);
      }
      user.password = password;
      user.hashPassowrd();
      await user.save();
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    if (!req.params.userId) {
      throw new BadRequestError("Не указан userId");
    }
    try {
      const user = await getRepository(User).findOne(req.params.userId);
      if (!user) {
        throw new NotFoundError(
          `Пользователь с id ${req.params.userId} не найден`
        );
      }
      await getRepository(User).remove(user);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
export default new UserController();
