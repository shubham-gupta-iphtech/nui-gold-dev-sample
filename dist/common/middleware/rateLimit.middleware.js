"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRateLimit = registerRateLimit;
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
async function registerRateLimit(app) {
    await app.register(rate_limit_1.default, {
        max: 100,
        timeWindow: "1 minute",
        errorResponseBuilder: () => ({
            success: false,
            message: "Too many requests, please try again later.",
        }),
    });
}
//# sourceMappingURL=rateLimit.middleware.js.map