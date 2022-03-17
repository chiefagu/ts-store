import { Router } from "express";
import { expressCallBack } from "../express-callback";
import {
  getGenre,
  getGenres,
  postGenre,
  putGenre,
  deleteGenre,
} from "./controllers";

export function genreRouter() {
  const router = Router();

  router.post("/", expressCallBack(postGenre));
  router.get("/", expressCallBack(getGenres));
  router.get("/:id", expressCallBack(getGenre));
  router.put("/:id", expressCallBack(putGenre));
  router.delete("/:id", expressCallBack(deleteGenre));

  return router;
}
