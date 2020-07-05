import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import * as argon2 from "argon2";
import * as jsonwebtoken from "jsonwebtoken";
import { User } from "../entity/User";
import { BadRequestError, NotFoundError } from "../Errors";
import { UserRole } from "../entity/UserRole";

class AuthController {
  async signIn({ body }: Request, res: Response) {
    if (body.password && body.login) {
      const repository = getRepository(User);
      const user = await repository.findOne({ where: { login: body.login } });
      if (!user) {
        res
          .status(404)
          .json({ message: "Пользователь " + body.login + " не найден" });
        return;
      }
      if (await argon2.verify(user.password, body.password)) {
        const data = {
          id: user.id,
          login: user.login,
          fullName: user.fullName,
          roles: user.roles,
        };
        const token = jsonwebtoken.sign(
          { data },
          "tIzbiVAJ3IB1xYubrwGeddK9AjdQiqmq",
          { expiresIn: "10h" }
        );
        res.json({ accessToken: token });
      } else {
        res.status(400).json({ message: "Неверный пароль" });
      }
    } else {
      res.status(400).json({ message: "Укажите логин и пароль" });
    }
  }
  async getRolesPermissions(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await getRepository(UserRole).find({
        relations: ["domains"],
      });
      res.status(200).json(roles);
    } catch (error) {
      next(error);
    }
  }
}
export default new AuthController();
