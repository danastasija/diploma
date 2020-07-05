import * as express from "express";
import { PersonConroller } from "../controller/PersonController";

export default () => {
  const router = express.Router();
  const controller = new PersonConroller();

  router.get("/", async (req, res, next) => {
    const persons = await controller.all(req, res, next);
    res.json(persons || []);
  });
  router.post("/", controller.UpdateOrCreate.bind(controller));
  router.get("/:id", controller.one.bind(controller));
  router.delete("/:id", controller.remove.bind(controller));
  router.put("/:id/archive", controller.archive.bind(controller));
  router.put("/:id/recover", controller.recover.bind(controller));
  return router;
};
