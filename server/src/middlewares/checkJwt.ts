import { RequestHandler } from "express";
import * as jwt from "express-jwt";
export default jwt({
  secret: "tIzbiVAJ3IB1xYubrwGeddK9AjdQiqmq",
  getToken: function fromHeaderOrQuerystring(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  },
});
