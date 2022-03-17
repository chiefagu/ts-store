import { Logger } from "winston";
import { HttpRequest, HttpResponse } from "../../express-callback";
import { InvalidPropertyError } from "../../utils";
import { FindGenre } from "../use-case";

type GetGenreDeps = {
  findGenre: FindGenre;
  logger: Logger;
};

export function makeGetGenre({ findGenre, logger }: GetGenreDeps) {
  return async function getGenre(
    httpRequest: HttpRequest
  ): Promise<HttpResponse> {
    const headers = { "Content-Type": "application/json" };
    try {
      const genre = await findGenre(httpRequest.params?.id);
      return {
        headers,
        statusCode: 200,
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
