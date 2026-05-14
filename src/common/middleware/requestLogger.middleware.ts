import { FastifyInstance } from "fastify";
import { logger } from "../../config/logger";

export async function registerRequestLogger(app: FastifyInstance) {
  app.addHook("onRequest", async (request) => {
    logger.info(
      { method: request.method, url: request.url },
      "Incoming request",
    );
  });

  app.addHook("onResponse", async (request, reply) => {
    logger.info(
      {
        method: request.method,
        url: request.url,
        statusCode: reply.statusCode,
        responseTime: reply.elapsedTime,
      },
      "Request completed",
    );
  });
}
