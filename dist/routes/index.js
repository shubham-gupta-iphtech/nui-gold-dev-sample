"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = routes;
const user_routes_1 = require("../modules/users/user.routes");
const user_routes_2 = require("../modules/users/user.routes");
async function routes(app) {
    // Existing user management routes
    app.register(user_routes_1.userRoutes, {
        prefix: "/api/users",
    });
    // Auth routes (registration, login, etc.) — public, no JWT needed
    // This is where POST /api/v1/auth/register lives
    app.register(user_routes_2.authRoutes, {
        prefix: "/api/v1/auth",
    });
}
//# sourceMappingURL=index.js.map