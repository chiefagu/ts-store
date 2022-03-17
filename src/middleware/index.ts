import { logger } from "../logger";
import { verifyJwt, reIssueAccessToken } from "../utils";

import { makeDeserializeUser } from "./deserialize-user";
import { makeErrorHandler } from "./error.middleware";
import { makeNotFoundHandler } from "./not-found.middleware";
import { makeRequireUser } from "./require-user";

export const errorHandler = makeErrorHandler(logger);
export const notFoundHandler = makeNotFoundHandler(logger);
export const deserializeUser = makeDeserializeUser({
  verifyJwt,
  reIssueAccessToken,
  logger,
});
export const requireUser = makeRequireUser(logger);
