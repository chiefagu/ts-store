import { Logger } from "winston";
import { HttpRequest, HttpResponse } from "../../express-callback";
import { InvalidPropertyError } from "../../utils";
import { RemoveGenre } from "../use-case";

type DeleteGenreDeps = {
  removeGenre: RemoveGenre;
  logger: Logger;
};

export function makeDeleteGenre({ removeGenre, logger }: DeleteGenreDeps) {
  return async function deleteGenre(
    httpRequest: HttpRequest
  ): Promise<HttpResponse> {
    const headers = { "Content-Type": "application/json" };

    try {
      const deleted = await removeGenre(httpRequest.params.id);

      return {
        headers,
        statusCode: 200,
        body: deleted || "failed to delete",
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
