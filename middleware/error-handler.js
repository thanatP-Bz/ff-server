import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (error, req, res, next) => {
  console.log(error);
  const defaultError = {
    statusCode: error.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || "Something went wrong please try again later",
  };

  if (error.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.message = Object.values(error.errors)
      .map((item) => item.message)
      .join(",");
  }

  if (error.code && error.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.message = `${Object.keys(
      error.keyValue
    )} filed has to be unique`;
  }

  res.status(defaultError.statusCode).json({ msg: defaultError.message });
};

export default errorHandlerMiddleware;
