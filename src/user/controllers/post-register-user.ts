import { HttpRequest } from "../../express-callback";
import { logger } from "../../logger";
import { InvalidPropertyError } from "../../utils";
import { AddUser } from "../use-case";

type PostUserDeps = {
  addUser: AddUser;
};

export function makePostRegisterUser({ addUser }: PostUserDeps) {
  return async function postRegisterUser(httpRequest: HttpRequest) {
    const headers = { "Content-Type": "application/json" };
    try {
      const user = await addUser(httpRequest.body);
      return {
        headers,
        statusCode: 200,
        body: user,
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
