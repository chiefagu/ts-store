import { userDb } from "../data-access";
import { getHash, signJwt, comparePassword } from "../../utils";
import { makeAddUser } from "./add-user";
import { makeLoginUser } from "./login-user";

export const addUser = makeAddUser({ userDb, signJwt, getHash });
export const loginUser = makeLoginUser({ userDb, signJwt, comparePassword });

export type LoginUser = typeof loginUser;
export type AddUser = typeof addUser;
