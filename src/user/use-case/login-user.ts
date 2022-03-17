import config from "config";
import { SignJwt, ComparePassword, InvalidPropertyError } from "../../utils";
import { UserDb } from "../data-access";

type LoginUserDeps = {
  userDb: UserDb;
  signJwt: SignJwt;
  comparePassword: ComparePassword;
};

type LoginDetails = {
  email: string;
  password: string;
};

export function makeLoginUser({
  userDb,
  signJwt,
  comparePassword,
}: LoginUserDeps) {
  return async function loginUser({ email, password }: LoginDetails) {
    const user = await userDb.findByEmail(email);

    if (!user) {
      throw new InvalidPropertyError("Invalid email or password used");
    }

    if (!comparePassword(user.password, password)) {
      throw new InvalidPropertyError("Invalid email or password");
    }

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
