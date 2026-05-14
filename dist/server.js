"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = require("./app");
const logger_1 = require("./config/logger");
const database_1 = require("./config/database");
const start = async () => {
    try {
        await database_1.sequelize.authenticate();
        logger_1.logger.info("Database connected");
        await database_1.sequelize.sync({
            alter: true,
        });
        logger_1.logger.info("Database synced");
        await app_1.app.listen({
            port: Number(process.env.PORT) || 3000,
            host: "0.0.0.0",
        });
        logger_1.logger.info(`Server running on port ${process.env.PORT}`);
    }
    catch (error) {
        logger_1.logger.error(error);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=server.js.map