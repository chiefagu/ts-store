import { Logger } from "winston";
import { Response } from "express";

export function makeErrorHandler(logger: Logger) {
  return function errorHandler(err: unknown, res: Response) {
    let message = "ErrorMiddleware";
    if (err instanceof Error) {
      message = err.message;
    }
    logger.error(message, err);
    return res.status(500).send({ message: "Something went wrong" });
  };
}
