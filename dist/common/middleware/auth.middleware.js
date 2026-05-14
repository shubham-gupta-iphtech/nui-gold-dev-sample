"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const app_error_1 = require("../errors/app-error");
async function authenticate(request, reply) {
    try {
        await request.jwtVerify();
    }
    catch (err) {
        throw new app_error_1.AppError("Unauthorized: invalid or missing token", 401);
    }
}
//# sourceMappingURL=auth.middleware.js.map