import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { logger } from "../../config/logger";

export async function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  logger.error(error);
  return reply.status(500).send({
    success: false,
    message: error.message,
  });
}
