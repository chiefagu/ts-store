import { NextFunction, Response, Request } from "express";
import { Logger } from "winston";

export function makeRequireUser(logger: Logger) {
  return function requireUser(req: Request, res: Response, next: NextFunction) {
    if (!req.jwtPayload?._id) {
      logger.log("error", "missing jwt payload");
      res.sendStatus(403);
    }

    next();
  };
}
