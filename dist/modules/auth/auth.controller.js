"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = void 0;
const auth_schema_1 = require("./auth.schema");
const auth_service_1 = require("./auth.service");
const zod_1 = require("zod");
const registerController = async (request, reply) => {
    try {
        // 1. Zod Validation
        const parsedBody = auth_schema_1.RegisterPayloadSchema.parse(request.body);
        // 2. Service Call
        const result = await (0, auth_service_1.registerBusinessAndEmployees)(parsedBody);
        // 3. Success Response
        return reply.status(201).send({
            success: true,
            message: result.message,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return reply.status(400).send({
                success: false,
                message: "Validation Error",
                errors: error.errors.map((e) => ({
                    path: e.path.join("."),
                    message: e.message,
                })),
            });
        }
        if (error instanceof auth_service_1.AuthError) {
            return reply.status(error.statusCode).send({
                success: false,
                message: error.message,
            });
        }
        // Generic fallback for unexpected errors
        console.error("[RegisterError]", error);
        return reply.status(500).send({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.registerController = registerController;
//# sourceMappingURL=auth.controller.js.map