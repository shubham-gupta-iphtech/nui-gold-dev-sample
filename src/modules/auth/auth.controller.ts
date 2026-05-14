import {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import { AuthService } from "./auth.service";

import {
  registerSchema,
} from "./auth.validation";


export class AuthController {

  static async registerTrader(
    request: FastifyRequest,
    reply: FastifyReply
  ) {

    const parsedData =
      registerSchema.parse(
        request.body
      );

    const result =
      await AuthService.registerTrader(
        parsedData
      );

    return reply
      .status(201)
      .send(result);
  }



}


