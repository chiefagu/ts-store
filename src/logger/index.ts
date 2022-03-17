import config from "config";
import { devLogger, prodLogger } from "./logger";

export const logger =
  config.get<string>("environment") !== "production"
    ? devLogger()
    : prodLogger();
