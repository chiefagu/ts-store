import { Router } from "express";
import { expressCallBack } from "../express-callback";
import { postLoginUser, postRegisterUser } from "./controllers";

export function userRouter() {
  const router = Router();

  router.post("/register", expressCallBack(postRegisterUser));
  router.post("/login", expressCallBack(postLoginUser));

  return router;
}
