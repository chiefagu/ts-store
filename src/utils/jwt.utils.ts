import {
  sign,
  verify,
  SignOptions,
  Secret,
  JsonWebTokenError,
} from "jsonwebtoken";
import { logger } from "../logger";

export interface SignJwtOptions {
  payload: string | object;
  secret: Secret;
  options: SignOptions | undefined;
}

export interface VerifyJwtOptions {
  token: string;
  secret: Secret;
}

export function signJwt({ payload, secret, options }: SignJwtOptions) {
  return sign(payload, secret, options);
}

export function verifyJwt({ token, secret }: VerifyJwtOptions) {
  try {
    const decoded = verify(token, secret);

    if (decoded)
      return {
        decoded,
        expired: false,
        valid: true,
      };
    throw new JsonWebTokenError("couldn't decode token");
  } catch (e) {
    if (e instanceof JsonWebTokenError) {
      logger.error(e.message, e);
      return {
        decoded: null,
        expired: e?.message?.includes("expired"),
        valid: false,
      };
    }
    throw e;
  }
}

export type SignJwt = typeof signJwt;
export type VerifyJwt = typeof verifyJwt;
