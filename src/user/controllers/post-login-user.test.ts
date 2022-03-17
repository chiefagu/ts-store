/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from "../../logger";
import { InvalidPropertyError } from "../../utils";
import { makePostLoginUser } from "./post-login-user";

describe("controller: post login user", () => {
  const loginUser = jest.fn();
  const postLoginUser = makePostLoginUser({ loginUser } as any);

  describe("successfully login user", () => {
    it("responds with 200 and the access and refresh token", async () => {
      const userInput = { email: "e@m.com", password: "a password" };
      const httpRequest = {
        body: userInput,
      };

      const headers = { "Content-Type": "application/json" };
      const accessToken = "accessToken";
      const refreshToken = "refreshToken";

      const result = {
        ...userInput,
        accessToken,
        refreshToken,
      };

      jest.spyOn(logger, "log").mockReturnValueOnce({} as any);
      loginUser.mockResolvedValueOnce(result);

      const actual = await postLoginUser(httpRequest as any);

      expect(loginUser).toHaveBeenCalledTimes(1);
      expect(loginUser).toHaveBeenCalledWith(httpRequest.body);

      expect(logger.log).not.toHaveBeenCalled();

      expect(actual).toEqual({
        headers,
        statusCode: 200,
        body: result,
      });
    });
  });

  describe("failed to login user", () => {
    describe("handles a known error", () => {
      it("responds with 400 and the error msg", async () => {
        const userInput = { email: "e@m.com", password: "a password" };
        const httpRequest = {
          body: userInput,
        };

        const headers = { "Content-Type": "application/json" };

        const error = new InvalidPropertyError("scream!!");

        jest.spyOn(logger, "log").mockReturnValueOnce({} as any);

        loginUser.mockRejectedValueOnce(error);

        const actual = await postLoginUser(httpRequest as any);

        expect(loginUser).toHaveBeenCalledTimes(1);
        expect(loginUser).toHaveBeenCalledWith(httpRequest.body);

        expect(logger.log).toHaveBeenCalledTimes(1);
        expect(logger.log).toHaveBeenCalledWith("error", error);

        expect(actual).not.toMatchObject({
          headers,
          statusCode: 200,
        });

        expect(actual).toEqual({
          headers,
          statusCode: 400,
          body: error.message,
        });
      });
    });

    describe("recieved an unknown error", () => {
      it("rethrows error, to be handled by error middleware", async () => {
        const userInput = { email: "e@m.com", password: "a password" };
        const httpRequest = {
          body: userInput,
        };

        const headers = { "Content-Type": "application/json" };

        const error = "error";

        jest.spyOn(logger, "log").mockReturnValueOnce({} as any);

        loginUser.mockRejectedValueOnce(error);

        try {
          const actual = await postLoginUser(httpRequest as any);

          expect(actual).not.toMatchObject({
            headers,
            statusCode: 200,
          });

          expect(loginUser).toHaveBeenCalledTimes(1);
          expect(loginUser).toHaveBeenCalledWith(httpRequest.body);

          expect(actual).not.toMatchObject({
            headers,
            statusCode: 400,
          });
        } catch (e) {
          expect(logger.log).not.toHaveBeenCalled();
          expect(e).toBe(error);
        }
      });
    });
  });
});
