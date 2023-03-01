import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../error/index.js";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.SECRET);

    req.user = payload;
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  next();
};

export default auth;
