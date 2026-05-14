import Fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { routes } from "./routes";
import { errorHandler } from "./common/middleware/error.middleware";
import { env } from "./config/env";
import { logger } from "./config/logger";

export const app = Fastify({
  loggerInstance: logger,
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(cors);
app.register(helmet);
app.register(routes);
app.setErrorHandler(errorHandler);
