import * as express from "express";
import { getRepository } from "typeorm";

export default () => {
  const router = express.Router();

  router.get("/autocomplete", async (req, res) => {
    const personOptionsets = ["mentor", "holoConsultant"];
    const { type, searchText } = req.query;
    if (!type || typeof type !== "string") {
      return res.status(400).json({ message: 'Параметр "type" обязателен' });
    }
    const isPersonOptionset = personOptionsets.includes(type);
    try {
      const column = isPersonOptionset ? "entity.fullName" : "entity.label";
      let query = getRepository(
        isPersonOptionset ? "person" : type
      ).createQueryBuilder("entity");
      if (searchText && typeof searchText === "string") {
        query = query.where(`LOWER(${column}) LIKE :searchText`, {
          searchText: `%${searchText.toLowerCase()}%`,
        });
      }
      if (isPersonOptionset) {
        query = query.select(["entity.id", "entity.fullName"]);
      }
      const suggestions = await query.take(10).getMany();
      res
        .status(200)
        .json(
          suggestions.map((entity: any) =>
            isPersonOptionset
              ? { id: entity.id, label: entity.fullName }
              : entity
          )
        );
    } catch (error) {
      res.status(404).send(`Cannot find ${type} repository`);
      return;
    }
  });
  router.get("/:type", async (req, res, next) => {
    let rep;
    try {
      rep = getRepository(req.params.type);
    } catch (error) {
      res.status(404).send(`Cannot find ${req.params.type} repository`);
      return;
    }
    res.json(await rep.find());
  });
  return router;
};
