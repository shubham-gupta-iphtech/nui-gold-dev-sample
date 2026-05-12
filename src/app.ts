import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { routes } from "./routes";
import { errorHandler } from "./common/middleware/error.middleware";
import { logger } from "./config/logger";

export const app = Fastify({
  loggerInstance: logger,
  //logger: logger,
});

app.register(cors);
app.register(helmet);
app.register(routes);
app.setErrorHandler(errorHandler);
