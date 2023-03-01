import { StatusCodes } from "http-status-codes";

const notFoundMiddleware = (req, res) =>
  res.status(StatusCodes.NOT_FOUND).json({ msg: "page not found" });

export default notFoundMiddleware;
