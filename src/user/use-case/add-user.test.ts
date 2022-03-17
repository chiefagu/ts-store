/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildFakeUser, resolve } from "../../../__tests__/fixtures";
import { InvalidPropertyError } from "../../utils";
import { makeAddUser } from "./add-user";

describe("use-case: add user", () => {
  const userDb = { findByEmail: jest.fn(), insert: jest.fn() };
  const signJwt = jest.fn();
  const getHash = jest.fn();

  const addUser = makeAddUser({ userDb, signJwt, getHash } as any);

  describe("user details already exists", () => {
    it("throws a custom error", async () => {
      const userDetails = buildFakeUser();

      const user = { ...userDetails };
      userDb.findByEmail.mockResolvedValueOnce(user);

      const error = await addUser(userDetails).catch(resolve);

      expect(userDb.findByEmail).toHaveBeenCalledWith(userDetails.email);
      expect(userDb.findByEmail).toHaveBeenCalledTimes(1);

      expect(error).toBeInstanceOf(InvalidPropertyError);
      expect(error.message).toMatchInlineSnapshot(`"User already exists"`);
    });
  });

  describe("new/unique user details", () => {
    it("creates a user in db", async () => {
      const userDetails = buildFakeUser();

      const user = { ...userDetails };
      userDb.findByEmail.mockResolvedValueOnce(null);

      userDb.insert.mockResolvedValueOnce(user);
      getHash.mockReturnValue("hashed");

      const error = await addUser(userDetails).catch(resolve);

      expect(userDb.findByEmail).toHaveBeenCalledWith(userDetails.email);
      expect(userDb.findByEmail).toHaveBeenCalledTimes(1);

      expect(userDb.insert).toHaveBeenCalledTimes(1);
      expect(userDb.insert).toHaveBeenCalledWith({
        name: user.name,
        email: user.email,
        password: "hashed",
      });
      expect(error.message).toBeUndefined();
    });

    it("returns an access & refresh Token", async () => {
      const userDetails = {
        name: "a name",
        email: "e@m.com",
        password: "password",
      };

      const user = { _id: "id", ...userDetails };
      userDb.findByEmail.mockResolvedValueOnce(null);

      userDb.insert.mockResolvedValueOnce(user);
      getHash.mockReturnValue("hashed");
      signJwt.mockReturnValueOnce("1").mockReturnValue("2");

      const actual = await addUser(userDetails).catch(resolve);

      expect(userDb.findByEmail).toHaveBeenCalledWith(userDetails.email);
      expect(userDb.findByEmail).toHaveBeenCalledTimes(1);

      expect(userDb.insert).toHaveBeenCalledTimes(1);
      expect(userDb.insert).toHaveBeenCalledWith({
        name: user.name,
        email: user.email,
        password: "hashed",
      });

      expect(signJwt).toHaveBeenCalledTimes(2);

      expect(actual).toEqual({
        accessToken: "1",
        refreshToken: "2",
      });
    });
  });
});
