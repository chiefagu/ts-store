import { addUser, loginUser } from "../use-case";
import { makePostLoginUser } from "./post-login-user";
import { makePostRegisterUser } from "./post-register-user";

export const postRegisterUser = makePostRegisterUser({ addUser });
export const postLoginUser = makePostLoginUser({ loginUser });
