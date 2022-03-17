import { default as config } from "config";
import { buildApp } from "./app";
import { connectDb } from "./db/connect-db";
import { logger } from "./logger";

connectDb();
const app = buildApp();
const port = Number(config.get<string>("port"));

app.listen(port, () => {
  logger.info(`listening on port ${port}`);
});
