import config from "config";

import { makeUser } from "..";
import { UserDb } from "../data-access";
import { GetHash, InvalidPropertyError, SignJwt } from "../../utils";
import { UserDetails } from "../user";

type AddUserDeps = {
  userDb: UserDb;
  signJwt: SignJwt;
  getHash: GetHash;
};

export function makeAddUser({ userDb, signJwt, getHash }: AddUserDeps) {
  return async function addUser(userDetails: UserDetails) {
    const { getName, getEmail, getPassword } = makeUser(userDetails);

    const exists = await userDb.findByEmail(getEmail());

    if (exists) {
      throw new InvalidPropertyError("User already exists");
    }

    const user = await userDb.insert({
      name: getName(),
      email: getEmail(),
      password: getHash(getPassword()),
    });

    const payload = {
      _id: user._id,
      isAdmin: user.isAdmin,
    };

    const accessToken = signJwt({
      payload,
      secret: config.get<string>("accessKey"),
      options: { expiresIn: config.get<string>("accessTokenTtl") },
    });

    const refreshToken = signJwt({
      payload,
      secret: config.get<string>("refreshKey"),
      options: { expiresIn: config.get<string>("refreshTokenTtl") },
    });

    return { accessToken, refreshToken };
  };
}
