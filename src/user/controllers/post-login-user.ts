import { HttpRequest, HttpResponse } from "../../express-callback";
import { logger } from "../../logger";
import { InvalidPropertyError } from "../../utils";
import { LoginUser } from "../use-case";

type LoginUserDeps = {
  loginUser: LoginUser;
};

export function makePostLoginUser({ loginUser }: LoginUserDeps) {
  return async function postLoginUser(
    httpRequest: HttpRequest
  ): Promise<HttpResponse> {
    const headers = { "Content-Type": "application/json" };

    try {
      const result = await loginUser(httpRequest.body);
      return {
        headers,
        statusCode: 200,
        body: result,
      };
    } catch (e) {
      if (e instanceof InvalidPropertyError) {
        logger.log("error", e);
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
