import {
  getRepository,
  QueryBuilder,
  Brackets,
  TransactionManager,
  getConnection,
} from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Person } from "../entity/Person";
import { Skill } from "../entity/Skill";
import { parse } from "querystring";
import { Salary } from "../entity/Salary";
import UserController from "./UserController";

function getAddRemoveIds(exist, incoming) {
  const existIds = exist.map((entity) => entity.id);
  const toAddIds = incoming.map((entity) => entity.id);
  const remove = existIds.filter((entityId) => !toAddIds.includes(entityId));
  const add = toAddIds.filter((entityId) => !existIds.includes(entityId));
  return [add, remove];
}

export class PersonConroller {
  private userRepository = getRepository(Person);

  private async getFullPerson(id: string | number) {
    const person = await this.userRepository.findOne(id, {
      relations: [
        "skills",
        "status",
        "positions",
        "children",
        "socialNetworks",
        "previousJobs",
        "educations",
        "additionalEducations",
        "mentor",
        "holaСonsultant",
        "holaDates",
        "adaptationFiles",
        "dismissalFile",
        "cause",
      ],
    });
    if (!person) {
      return person;
    }
    const { mentor, holaСonsultant, ...other } = person;
    const res: any = other;
    if (holaСonsultant) {
      res.holaСonsultant = {
        id: holaСonsultant.id,
        label: holaСonsultant.fullName,
      };
    }
    if (mentor) {
      res.mentor = { id: mentor.id, label: mentor.fullName };
    }
    return res;
  }

  async all(request: Request, response: Response, next: NextFunction) {
    const search = request.query.searchText as string;
    const isArchive = !!request.query.archived;
    let query = this.userRepository
      .createQueryBuilder("person")
      .select([
        "person.fullName",
        "person.rate",
        "person.id",
        "person.dateOfDismissal",
      ])
      .leftJoinAndSelect("person.status", "status")
      .leftJoinAndSelect("person.positions", "positions")
      .leftJoinAndSelect("person.skills", "skills")
      .where("person.isArchived = :archived", { archived: isArchive });
    if (search) {
      query = query
        .andWhere(
          new Brackets((db) => {
            db.where("LOWER(person.fullName) LIKE :searchText")
              .orWhere("LOWER(status.label) LIKE :searchText")
              .orWhere("LOWER(positions.label) LIKE :searchText")
              .orWhere("LOWER(skills.label) LIKE :searchText");
          })
        )
        .setParameters({ searchText: `%${search.toLowerCase()}%` });
    }
    return query.getMany();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const res = await this.getFullPerson(request.params.id);
    if (!res) {
      return response.status(404).send("User not found");
    }
    response.status(200).json(res);
  }

  async UpdateOrCreate(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    let person: Person;
    const { id, status, positions, skills, ...body } = request.body;
    if (id && !isNaN(parseInt(id))) {
      person = await this.userRepository.findOneOrFail(
        { id },
        {
          relations: [
            "skills",
            "status",
            "cause",
            "positions",
            "children",
            "socialNetworks",
            "previousJobs",
            "educations",
            "additionalEducations",
            "holaDates",
            "adaptationFiles",
          ],
        }
      );
      if (!person) {
        response
          .status(404)
          .send("User with id " + request.body.id + " doesnt exist");
        return;
      }
      this.userRepository.merge(person, body);
      person.adaptationFiles = body.adaptationFiles;
      try {
        await person.save();
      } catch (error) {
        next(error);
      }
    } else {
      try {
        person = this.userRepository.create(request.body as Partial<Person>);
        await person.save();
      } catch (error) {
        response.status(500).send(error);
        return;
      }
    }
    try {
      // save status
      //   if (cause && (!person.cause || cause.id !== person.cause.id)) {
      //     await this.userRepository
      //       .createQueryBuilder("person")
      //       .relation("cause")
      //       .of(person)
      //       .set({ id: cause.id });
      //   }
      // save Status
      if (status && (!person.status || status.id !== person.status.id)) {
        await this.userRepository
          .createQueryBuilder("person")
          .relation("status")
          .of(person)
          .set({ id: status.id });
      }
      // update position
      if (positions) {
        const [positionIdsToAdd, positionIdsToRemove] = getAddRemoveIds(
          person.positions || [],
          positions
        );
        if (positionIdsToAdd.length || positionIdsToRemove.length) {
          await this.userRepository
            .createQueryBuilder("person")
            .relation("positions")
            .of(person)
            .addAndRemove(positionIdsToAdd, positionIdsToRemove);
        }
      }
      // create skills
      if (skills && skills.some((sk) => !sk.id)) {
        await getRepository(Skill).save(skills.filter((sk) => !sk.id));
      }
      // update skills
      if (skills) {
        const [skillIdsToAdd, skillIdsToRemove] = getAddRemoveIds(
          person.skills || [],
          skills.filter((sk) => !!sk.id)
        );
        if (skillIdsToAdd.length || skillIdsToRemove.length) {
          await this.userRepository
            .createQueryBuilder("person")
            .relation("skills")
            .of(person)
            .addAndRemove(skillIdsToAdd, skillIdsToRemove);
        }
      }

      const res = await this.getFullPerson(person.id);
      response.status(200).json(res);
    } catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
  }

  async remove(request: Request, response: Response) {
    let userToRemove = await this.userRepository.findOne(request.params.id);
    if (!userToRemove) {
      response.status(404).send("Not Found");
      return;
    }
    try {
      await this.userRepository.remove(userToRemove);
      response.status(200).send();
    } catch (error) {
      response.status(500).send(error);
    }
  }

  async archive(request: Request, response: Response) {
    let userToArchive = await this.userRepository.findOne(request.params.id);
    if (!userToArchive) {
      response.status(404).send(new Error("Пользователь не найден"));
      return;
    }
    userToArchive.isArchived = true;
    userToArchive.salaryHistory = [];
    await userToArchive.save();
    response.status(200).send();
  }
  async recover(request: Request, response: Response) {
    let userToRecover = await this.userRepository.findOne(request.params.id);
    if (!userToRecover) {
      response.status(404).send(new Error("Пользователь не найден"));
      return;
    }
    await this.userRepository.update(userToRecover.id, {
      isArchived: false,
      cabinet: null,
      workplace: null,
      shoebox: null,
      car: null,
    });
    response.status(200).send();
  }
}
