import { FastifyReply, FastifyRequest } from "fastify";
export declare class UserController {
    /**
     * Handles POST /api/v1/auth/register
     *
     * Validates the incoming payload, then calls the service to:
     *  - Check for duplicate emails
     *  - Create all records in one atomic transaction
     *  - Send welcome emails
     *
     * Error responses:
     *  - 400: Duplicate email / invalid cert format / missing AML values
     *  - 422: Employee role is "admin" or other forbidden value
     *  - 429: Too many registration attempts (rate limit)
     *  - 500: Unexpected server error (transaction rolled back)
     */
    static register(request: FastifyRequest, reply: FastifyReply): Promise<never>;
    static create(request: FastifyRequest, reply: FastifyReply): Promise<never>;
    static getAll(request: FastifyRequest, reply: FastifyReply): Promise<never>;
    static getOne(request: FastifyRequest<{
        Params: {
            id: string;
        };
    }>, reply: FastifyReply): Promise<never>;
    static update(request: FastifyRequest<{
        Params: {
            id: string;
        };
    }>, reply: FastifyReply): Promise<never>;
    static delete(request: FastifyRequest<{
        Params: {
            id: string;
        };
    }>, reply: FastifyReply): Promise<never>;
    static login(request: FastifyRequest, reply: FastifyReply): Promise<never>;
}
//# sourceMappingURL=user.controller.d.ts.map