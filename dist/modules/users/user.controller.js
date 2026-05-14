"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const zod_1 = require("zod");
const user_service_1 = require("./user.service");
const user_validation_1 = require("./user.validation");
class UserController {
    // ─── Trader Registration ───────────────────────────────────────────────────
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
    static async register(request, reply) {
        // Validate the full registration payload
        // If validation fails, ZodError is thrown and caught here for a clean 422/400 response
        let body;
        try {
            body = user_validation_1.registerTraderSchema.parse(request.body);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const issues = error.errors;
                // Check if any issue is about the employee "role" field
                // If so, return 422 (semantic error) instead of 400 (format error)
                const isRoleError = issues.some((issue) => issue.path.includes("role"));
                if (isRoleError) {
                    return reply.status(422).send({
                        success: false,
                        message: "Unprocessable Entity: Invalid employee role assignment",
                        errors: error.flatten(),
                    });
                }
                // All other Zod validation errors → 400 Bad Request
                return reply.status(400).send({
                    success: false,
                    message: "Validation failed",
                    errors: error.flatten(),
                });
            }
            throw error; // unknown error → let error middleware handle it
        }
        // Call the service to do the actual work
        const result = await user_service_1.UserService.registerTrader(body);
        return reply.status(201).send({
            success: true,
            message: "Registration Successful",
            data: result,
        });
    }
    // ─── Existing handlers (unchanged) ────────────────────────────────────────
    static async create(request, reply) {
        const body = user_validation_1.createUserSchema.parse(request.body);
        const user = await user_service_1.UserService.createUser(body);
        return reply.status(201).send({ success: true, data: user });
    }
    static async getAll(request, reply) {
        const users = await user_service_1.UserService.getUsers();
        return reply.send({ success: true, data: users });
    }
    static async getOne(request, reply) {
        const user = await user_service_1.UserService.getUser(request.params.id);
        return reply.send({ success: true, data: user });
    }
    static async update(request, reply) {
        const body = user_validation_1.updateUserSchema.parse(request.body);
        const user = await user_service_1.UserService.updateUser(request.params.id, body);
        return reply.send({ success: true, data: user });
    }
    static async delete(request, reply) {
        await user_service_1.UserService.deleteUser(request.params.id);
        return reply.send({ success: true, message: "User deleted successfully" });
    }
    static async login(request, reply) {
        const body = user_validation_1.loginSchema.parse(request.body);
        const user = await user_service_1.UserService.loginUser(body.email, body.password);
        const accessToken = await reply.jwtSign({ id: user.id, email: user.email, role: user.role }, { expiresIn: process.env.JWT_EXPIRES_IN });
        const refreshToken = await reply.jwtSign({ id: user.id, email: user.email, role: user.role }, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });
        return reply.send({ success: true, accessToken, refreshToken, user });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map