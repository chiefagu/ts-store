import { Request, Response } from "express";
import { Logger } from "winston";

export function makeNotFoundHandler(logger: Logger) {
  return function notFoundHandler(req: Request, res: Response) {
    const message = `Could not ${req.method} ${req.url}`;

    logger.log("error", message);

    res.status(404).send({ message });
  };
}
