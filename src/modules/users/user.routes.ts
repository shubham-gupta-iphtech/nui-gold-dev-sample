import { FastifyInstance } from "fastify";
import { UserController } from "./user.controller";

export async function userRoutes(app: FastifyInstance) {
  app.post("/", UserController.create);
  app.get("/", UserController.getAll);
  app.get("/:id", UserController.getOne);
  app.put("/:id", UserController.update);
  app.delete("/:id", UserController.delete);
}
