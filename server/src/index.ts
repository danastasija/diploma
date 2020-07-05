import "reflect-metadata";
import { createConnection } from "typeorm";
import * as cors from "cors";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as routes from "./routes";
import {
  BaseError,
  ErrorHandel,
  AuthenticationError,
  InternalServerError,
} from "./Errors";

const JWT_SECRET = "tIzbiVAJ3IB1xYubrwGeddK9AjdQiqmq";

createConnection()
  .then(async (connection) => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    app.use("/uploads", express.static("uploads"));

    app.use("/auth", routes.auth());
    app.use("/users", routes.user());
    app.use("/persons", routes.person());
    app.use("/options", routes.options());
    app.use("/upload", routes.upload());
    app.use("/salary", routes.salary());
    // start express server
    app.listen(3000);

    app.use(function (err, req, res, next) {
      if (err instanceof BaseError) {
        ErrorHandel(err, res);
      } else if (err.name === "UnauthorizedError") {
        ErrorHandel(new AuthenticationError(), res);
      } else {
        ErrorHandel(new InternalServerError(err.message || err), res);
      }
    });

    console.log("Express server has started on port 3000");
  })
  .catch((error) => {
    console.dir(error);
    console.log(error.message);
  });
