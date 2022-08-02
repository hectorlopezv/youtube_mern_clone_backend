import jwt from "jsonwebtoken";
import { createError } from "./errors.js";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "you are not authenticated"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(createError(403, "invalid token"));
    }
    //put user in the chain
    req.user = user;
    next();
  });
};
