import { default as config } from "config";
import { Express } from "express";
import { genreRouter } from "./genre/genre.router";
import { userRouter } from "./user/user.router";

export function routes(app: Express) {
  const baseUrl = config.get<string>("baseUrl");

  app.use(`${baseUrl}/health`, (req, res) => res.sendStatus(200));
  app.use(`${baseUrl}/user`, userRouter());
  app.use(`${baseUrl}/genre`, genreRouter());
}
