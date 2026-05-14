"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = authRoutes;
const auth_controller_1 = require("./auth.controller");
async function authRoutes(app) {
    app.post("/register", {
        config: {
            rateLimit: {
                max: 5,
                timeWindow: "1 minute",
            },
        },
        handler: auth_controller_1.registerController,
    });
}
//# sourceMappingURL=auth.routes.js.map