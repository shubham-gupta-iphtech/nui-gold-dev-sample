import { FastifyReply, FastifyRequest } from "fastify";

import { UserService } from "./user.service";

import { createUserSchema, updateUserSchema, loginSchema } from "./user.validation";

export class UserController {
  // static async create(request: FastifyRequest, reply: FastifyReply) {
  //   const body = createUserSchema.parse(request.body);

  //   const user = await UserService.createUser(body);

  //   return reply.status(201).send({
  //     success: true,
  //     data: user,
  //   });
  // }

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

  static async login(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {

    const body = loginSchema.parse(request.body);

    const user = await UserService.loginUser(
      body.email,
      body.password,
    );

    const accessToken = await reply.jwtSign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    const refreshToken = await reply.jwtSign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      },
    );

    return reply.send({
      success: true,
      accessToken,
      refreshToken,
      user,
    });
  }
}
