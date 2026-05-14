"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const fastify_1 = __importDefault(require("fastify"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const cors_1 = __importDefault(require("@fastify/cors"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
const routes_1 = require("./routes");
const error_middleware_1 = require("./common/middleware/error.middleware");
const env_1 = require("./config/env");
exports.app = (0, fastify_1.default)({
    logger: true,
});
exports.app.register(jwt_1.default, {
    secret: env_1.env.JWT_SECRET,
});
exports.app.register(cors_1.default);
exports.app.register(helmet_1.default);
exports.app.register(routes_1.routes);
exports.app.setErrorHandler(error_middleware_1.errorHandler);
//# sourceMappingURL=app.js.map