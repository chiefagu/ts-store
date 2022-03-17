import { Logger } from "winston";
import { HttpResponse } from "../../express-callback";
import { InvalidPropertyError } from "../../utils";
import { ListGenres } from "../use-case";

type GetGenresDeps = {
  listGenres: ListGenres;
  logger: Logger;
};

export function makeGetGenres({ listGenres, logger }: GetGenresDeps) {
  return async function getGenres(): Promise<HttpResponse> {
    const headers = { "Content-Type": "application/json" };
    try {
      const genres = await listGenres();
      return {
        headers,
        statusCode: 200,
        body: genres,
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
