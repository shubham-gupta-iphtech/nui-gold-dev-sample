"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRequestLogger = registerRequestLogger;
const logger_1 = require("../../config/logger");
async function registerRequestLogger(app) {
    app.addHook("onRequest", async (request) => {
        logger_1.logger.info({ method: request.method, url: request.url }, "Incoming request");
    });
    app.addHook("onResponse", async (request, reply) => {
        logger_1.logger.info({
            method: request.method,
            url: request.url,
            statusCode: reply.statusCode,
            responseTime: reply.elapsedTime,
        }, "Request completed");
    });
}
//# sourceMappingURL=requestLogger.middleware.js.map