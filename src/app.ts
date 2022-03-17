import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

import { routes } from "./routes";
import { errorHandler, notFoundHandler } from "./middleware";

export function buildApp() {
  const app = express();

  app.use(express.json());

  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(morgan("dev"));
  app.use(helmet());
  app.use(compression());

  routes(app);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
