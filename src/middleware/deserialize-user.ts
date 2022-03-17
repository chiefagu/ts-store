import config from "config";
import { NextFunction, Request, Response } from "express";
import { Logger } from "winston";
import { VerifyJwt } from "../utils";
import { ReIssueAccessToken } from "../utils/session";

type DeserializeUserDeps = {
  verifyJwt: VerifyJwt;
  reIssueAccessToken: ReIssueAccessToken;
  logger: Logger;
};

export function makeDeserializeUser({
  verifyJwt,
  reIssueAccessToken,
  logger,
}: DeserializeUserDeps) {
  return async function deserializeUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const accessToken = getBearerAccessToken(req);

    const refreshToken = req.get("x-refresh-token");

    if (!accessToken) {
      logger.warn("deserialize-user: Missing access token");
      return res.status(400).json({ message: "Missing access token" });
    }

    const { decoded, expired, valid } = verifyJwt({
      token: accessToken,
      secret: config.get("accessKey"),
    });

    if (!valid && !refreshToken) {
      return res.status(401).json({
        message: "Expired access token. Seems you are missing a refresh token",
      });
    }

    if (!decoded) {
      logger.warn("deserialize-user: Invalid access token");
      return res.status(401).json({ message: "Invalid access token" });
    }

    if (expired && refreshToken) {
      const newAccessToken = await reIssueAccessToken(refreshToken);

      if (!newAccessToken) {
        return res.status(500).json({ message: "something went wrong" });
      }

      res.setHeader("x-access-token", newAccessToken);

      const result = verifyJwt({
        token: newAccessToken,
        secret: config.get("accessKey"),
      });

      req.jwtPayload = result.decoded;
      return next();
    }

    req.jwtPayload = decoded;
    return next();
  };
}

function getBearerAccessToken(req: Request) {
  return req.get("Authorization")?.replace(/Bearer\s/i, "");
}
