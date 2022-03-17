import { connect } from "mongoose";
import config from "config";
import { logger } from "../logger";

export function connectDb() {
  const uri = config.get<string>("dbUri");
  connect(uri).then(() => {
    logger.info(`connected to db`);
  });
}
