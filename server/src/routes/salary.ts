import * as express from "express";
import { SalaryController } from "../controller/SalaryController";

export default () => {
  const router = express.Router();
  const controller = new SalaryController();

  router.get("/:id", controller.all);
  router.post("/:id", controller.add);
  return router;
};
