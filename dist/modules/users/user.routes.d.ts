import { FastifyInstance } from "fastify";
export declare function userRoutes(app: FastifyInstance): Promise<void>;
/**
 * Auth routes — publicly accessible (no JWT required).
 * Registered under /api/v1/auth in routes/index.ts
 */
export declare function authRoutes(app: FastifyInstance): Promise<void>;
//# sourceMappingURL=user.routes.d.ts.map