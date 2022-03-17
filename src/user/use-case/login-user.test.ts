/* eslint-disable @typescript-eslint/no-explicit-any */
import { InvalidPropertyError } from "../../utils";
import { makeLoginUser } from "./login-user";

describe("use-case: login user", () => {
  const userDb = { findByEmail: jest.fn() };
  const signJwt = jest.fn();
  const comparePassword = jest.fn();

  const loginUser = makeLoginUser({ userDb, signJwt, comparePassword } as any);

  describe("supplied invalid details", () => {
    it("throw an error when no user is found", async () => {
      const userInput = { email: "e@m.com", password: "a password" };

      userDb.findByEmail.mockResolvedValueOnce(null);

      try {
        await loginUser(userInput);
      } catch (err: any) {
        expect(userDb.findByEmail).toHaveBeenCalledTimes(1);
        expect(userDb.findByEmail).toHaveBeenCalledWith(userInput.email);

        expect(err.message).toMatchInlineSnapshot(
          `"Invalid email or password used"`
        );
      }
    });
    it("throw an error when password is wrong", async () => {
      const userInput = { email: "e@m.com", password: "a password" };

      const user = { _id: "id", name: "a name", ...userInput };

      userDb.findByEmail.mockResolvedValueOnce(user);
      comparePassword.mockReturnValueOnce(false);

      try {
        await loginUser(userInput);
      } catch (err: any) {
        expect(userDb.findByEmail).toHaveBeenCalledTimes(1);
        expect(userDb.findByEmail).toHaveBeenCalledWith(userInput.email);

        expect(comparePassword).toHaveBeenCalledTimes(1);
        expect(comparePassword).toHaveBeenCalledWith(
          user.password,
          userInput.password
        );

        expect(err).toBeInstanceOf(InvalidPropertyError);
        expect(err.message).toMatchInlineSnapshot(
          `"Invalid email or password"`
        );
      }
    });
  });
  describe("supplied valid details", () => {
    it("returns an access and refresh token", async () => {
      const userInput = { email: "e@m.com", password: "a password" };

      const user = { _id: "id", name: "a name", ...userInput };

      const accessToken = "AT";
      const refreshToken = "RT";

      userDb.findByEmail.mockResolvedValueOnce(user);
      comparePassword.mockReturnValueOnce(true);
      signJwt.mockReturnValueOnce(accessToken).mockReturnValue(refreshToken);

      try {
        const actual = await loginUser(userInput);
        expect(userDb.findByEmail).toHaveBeenCalledTimes(1);
        expect(userDb.findByEmail).toHaveBeenCalledWith(userInput.email);

        expect(comparePassword).toHaveBeenCalledTimes(1);
        expect(comparePassword).toHaveBeenCalledWith(
          user.password,
          userInput.password
        );

        expect(signJwt).toHaveBeenCalledTimes(2);

        expect(actual).toEqual({
          accessToken,
          refreshToken,
        });
      } catch (err: any) {
        expect(err.message).toBeNull();
      }
    });
  });
});
