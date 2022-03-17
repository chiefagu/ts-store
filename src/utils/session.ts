import config from "config";
import { JwtPayload } from "jsonwebtoken";
import { verifyJwt, signJwt } from ".";
import { userDb } from "../user/data-access";

export async function reIssueAccessToken(refreshToken: string) {
  const decoded = verifyJwt({
    token: refreshToken,
    secret: config.get("refreshKey"),
  }) as JwtPayload;

  if (!decoded && decoded["_id"]) return;

  const user = await userDb.findById(decoded._id);

  if (!user) return;

  const payload = { _id: user._id, isAdmin: user.isAdmin };

  const newAccessToken = signJwt({
    payload,
    secret: config.get("accesskey"),
    options: { expiresIn: config.get("accessTokenTtl") },
  });

  return newAccessToken;
}

export type ReIssueAccessToken = typeof reIssueAccessToken;
