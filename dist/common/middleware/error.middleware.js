"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
const app_error_1 = require("../errors/app-error");
async function errorHandler(error, request, reply) {
    console.error(error);
    // Custom App Errors
    if (error instanceof app_error_1.AppError) {
        return reply.status(error.statusCode).send({
            success: false,
            message: error.message,
        });
    }
    // Zod Validation Errors
    if (error instanceof zod_1.ZodError) {
        return reply.status(400).send({
            success: false,
            message: "Validation failed",
            errors: error.flatten(),
        });
    }
    // Default Errors
    return reply.status(500).send({
        success: false,
        message: "Internal server error",
    });
}
//# sourceMappingURL=error.middleware.js.map