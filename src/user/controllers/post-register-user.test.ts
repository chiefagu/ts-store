/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from "../../logger";
import { InvalidPropertyError } from "../../utils";
import { makePostRegisterUser } from "./post-register-user";

describe("controller: post register user", () => {
  const addUser = jest.fn();
  const postRegisterUser = makePostRegisterUser({ addUser } as any);

  describe("successfully posts a user", () => {
    it("responds with 200 status and a message", async () => {
      const userDetails = {
        name: "a name",
        email: "e@m.com",
        password: "password",
      };

      const user = { ...userDetails, _id: "id" };

      const headers = { "Content-Type": "application/json" };

      const httpRequest = {
        body: userDetails,
      };

      addUser.mockResolvedValueOnce(user);

      const response = await postRegisterUser(httpRequest as any);

      expect(addUser).toHaveBeenCalledTimes(1);
      expect(addUser).toHaveBeenCalledWith(userDetails);

      expect(response).toEqual({
        headers,
        statusCode: 200,
        body: user,
      });
    });
  });

  describe("failed to post a user", () => {
    describe("handles a known error", () => {
      it("responds with 400 status and an error message", async () => {
        const userDetails = {
          name: "a name",
          email: "e@m.com",
          password: "password",
        };

        const headers = { "Content-Type": "application/json" };

        const httpRequest = {
          body: userDetails,
        };

        const error = new InvalidPropertyError("oh no!");

        jest.spyOn(logger, "error").mockReturnValue({} as any);
        addUser.mockRejectedValueOnce(error);

        const response = await postRegisterUser(httpRequest as any);

        expect(addUser).toHaveBeenCalledTimes(1);
        expect(addUser).toHaveBeenCalledWith(userDetails);

        expect(response).toEqual({
          headers,
          statusCode: 400,
          body: error.message,
        });
      });
    });

    describe("recieved an unkown error", () => {
      it("rethrows error, will be handled by error middleware", async () => {
        const userDetails = {
          name: "a name",
          email: "e@m.com",
          password: "password",
        };

        const headers = { "Content-Type": "application/json" };

        const httpRequest = {
          body: userDetails,
        };

        const error = "dail 199";

        jest.spyOn(logger, "error").mockReturnValueOnce({} as any);
        addUser.mockRejectedValueOnce(error);

        try {
          const response = await postRegisterUser(httpRequest as any);

          expect(addUser).toHaveBeenCalledTimes(1);
          expect(addUser).toHaveBeenCalledWith(userDetails);

          expect(response).not.toMatchObject({
            headers,
            statusCode: 400,
          });
        } catch (e) {
          expect(logger.error).not.toHaveBeenCalled();
          expect(e).toBe(error);
        }
      });
    });
  });
});
