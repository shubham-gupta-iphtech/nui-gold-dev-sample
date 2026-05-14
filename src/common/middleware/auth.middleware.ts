import { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../errors/app-error";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify();
  } catch (err) {
    throw new AppError("Unauthorized: invalid or missing token", 401);
  }
}
