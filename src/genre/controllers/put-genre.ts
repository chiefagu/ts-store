import { Logger } from "winston";
import { HttpRequest, HttpResponse } from "../../express-callback";
import { InvalidPropertyError } from "../../utils";
import { EditGenre } from "../use-case";

type PutGenreDeps = {
  editGenre: EditGenre;
  logger: Logger;
};

export function makePutGenre({ editGenre, logger }: PutGenreDeps) {
  return async function putGenre(
    httpRequest: HttpRequest
  ): Promise<HttpResponse> {
    const headers = { "Content-Type": "application/json" };

    try {
      const updated = await editGenre({
        id: httpRequest.params.id,
        name: httpRequest.body.name,
      });

      return {
        headers,
        statusCode: 201,
        body: updated || "update failed",
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
