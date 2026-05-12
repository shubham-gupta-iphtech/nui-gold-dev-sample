import { FastifyInstance } from "fastify";
import { userRoutes } from "../modules/users/user.routes";

export async function routes(app: FastifyInstance) {
  app.register(userRoutes, {
    prefix: "/api/users",
  });
}
