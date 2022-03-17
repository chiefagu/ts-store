import { Logger } from "winston";
import { HttpRequest } from "../../express-callback";
import { InvalidPropertyError } from "../../utils";
import { AddGenre } from "../use-case";

type PostUserDeps = {
  addGenre: AddGenre;
  logger: Logger;
};

export function makePostGenre({ addGenre, logger }: PostUserDeps) {
  return async function postGenre(httpRequest: HttpRequest) {
    const headers = { "Content-Type": "application/json" };
    try {
      const genre = await addGenre(httpRequest.body);
      return {
        headers,
        statusCode: 201,
        body: genre,
      };
    } catch (e) {
      if (e instanceof InvalidPropertyError) {
        logger.error(e.message, e);
        return {
          headers,
          statusCode: 400,
          body: e.message,
        };
      }
      throw e;
    }
  };
}
