import { Response, Request } from "express";
import { getRepository } from "typeorm";
import { Person } from "../entity/Person";
import { Salary } from "../entity/Salary";

export class SalaryController {
  async all({ params: { id } }: Request, res: Response) {
    const history = await getRepository(Salary).find({
      where: { person: { id } },
      relations: ["positions", "file"],
      order: { createdAt: "DESC" },
    });
    res.status(200).json(history);
  }
  async add({ body, params: { id } }: Request, res: Response) {
    if (!id) {
      res.status(400).json(new Error("Пользователь не найден"));
      return;
    }
    const person = await getRepository(Person).findOne(id);
    if (!person) {
      new Error("Пользователь не найден");
    }
    try {
      const salary = await getRepository(Salary).save(body);
      await getRepository(Person).save({ id: +id, positions: body.positions });
      await getRepository(Person)
        .createQueryBuilder("person")
        .relation("salaryHistory")
        .of(person)
        .add(salary);
      res.status(200).json(salary);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
