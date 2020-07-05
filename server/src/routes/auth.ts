import * as express from "express";
import AuthController from "../controller/AuthController";
import checkJwt from "../middlewares/checkJwt";
import { AuthenticationError } from "../Errors";

export default () => {
  const router = express.Router();

  router.get("/verify", checkJwt, (req, res) => {
    if (req.user) {
      res.status(200).send();
    } else {
      throw new AuthenticationError();
    }
  });
  router.post("/login", AuthController.signIn.bind(AuthController));
  router.get(
    "/permissions",
    AuthController.getRolesPermissions.bind(AuthController)
  );
  return router;
};
