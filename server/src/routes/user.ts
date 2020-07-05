import * as express from "express";
import UserController from "../controller/UserController";
import checkJwt from "../middlewares/checkJwt";

export default () => {
  const router = express.Router();
  router.use(checkJwt);

  router.get("/", UserController.getUsers.bind(UserController));
  router.post("/", UserController.createUser.bind(UserController));
  router.put("/", UserController.update.bind(UserController));
  router.put(
    "/changePassword",
    UserController.changePassword.bind(UserController)
  );
  router.delete("/:userId", UserController.deleteUser.bind(UserController));
  router.get("/profile", UserController.getProfile.bind(UserController));
  return router;
};
