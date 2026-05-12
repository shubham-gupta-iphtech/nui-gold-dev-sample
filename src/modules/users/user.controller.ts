import { FastifyReply, FastifyRequest } from "fastify";

import { UserService } from "./user.service";

import { createUserSchema, updateUserSchema } from "./user.validation";

export class UserController {
  static async create(request: FastifyRequest, reply: FastifyReply) {
    const body = createUserSchema.parse(request.body);

    const user = await UserService.createUser(body);

    return reply.status(201).send({
      success: true,
      data: user,
    });
  }

  static async getAll(request: FastifyRequest, reply: FastifyReply) {
    const users = await UserService.getUsers();

    return reply.send({
      success: true,
      data: users,
    });
  }

  static async getOne(
    request: FastifyRequest<{
      Params: { id: string };
    }>,
    reply: FastifyReply,
  ) {
    const user = await UserService.getUser(request.params.id);

    return reply.send({
      success: true,
      data: user,
    });
  }

  static async update(
    request: FastifyRequest<{
      Params: { id: string };
    }>,
    reply: FastifyReply,
  ) {
    const body = updateUserSchema.parse(request.body);

    const user = await UserService.updateUser(request.params.id, body);

    return reply.send({
      success: true,
      data: user,
    });
  }

  static async delete(
    request: FastifyRequest<{
      Params: { id: string };
    }>,
    reply: FastifyReply,
  ) {
    await UserService.deleteUser(request.params.id);

    return reply.send({
      success: true,
      message: "User deleted successfully",
    });
  }
}
