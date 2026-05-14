"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = userRoutes;
exports.authRoutes = authRoutes;
const user_controller_1 = require("./user.controller");
async function userRoutes(app) {
    // ─── Existing user routes ────────────────────────────────────────────────
    app.post("/", user_controller_1.UserController.create);
    app.get("/", user_controller_1.UserController.getAll);
    app.get("/:id", user_controller_1.UserController.getOne);
    app.put("/:id", user_controller_1.UserController.update);
    app.delete("/:id", user_controller_1.UserController.delete);
    app.post("/login", user_controller_1.UserController.login);
}
/**
 * Auth routes — publicly accessible (no JWT required).
 * Registered under /api/v1/auth in routes/index.ts
 */
async function authRoutes(app) {
    /**
     * POST /api/v1/auth/register
     *
     * Rate limit: max 5 registration attempts per 15 minutes per IP.
     * This prevents bots from spamming the registration endpoint.
     *
     * Note: The config.rateLimit option works because @fastify/rate-limit
     * is registered globally in app.ts. It reads this config automatically.
     */
    app.post("/register", {
        config: {
            rateLimit: {
                max: 5,
                timeWindow: "15 minutes",
                errorResponseBuilder: () => ({
                    success: false,
                    message: "Too many registration attempts. Please wait 15 minutes and try again.",
                }),
            },
        },
    }, user_controller_1.UserController.register);
}
//# sourceMappingURL=user.routes.js.map