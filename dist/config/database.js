"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const env_1 = require("./env");
const user_model_1 = require("../database/models/user.model");
const business_model_1 = require("../database/models/business.model");
const employee_model_1 = require("../database/models/employee.model");
const resale_certificate_model_1 = require("../database/models/resale-certificate.model");
const aml_questionnaire_model_1 = require("../database/models/aml-questionnaire.model");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: "postgres",
    host: env_1.env.DB_HOST,
    port: env_1.env.DB_PORT,
    username: env_1.env.DB_USER,
    password: env_1.env.DB_PASSWORD,
    database: env_1.env.DB_NAME,
    logging: false,
    models: [user_model_1.User, business_model_1.Business, employee_model_1.Employee, resale_certificate_model_1.ResaleCertificate, aml_questionnaire_model_1.AMLQuestionnaire],
});
//# sourceMappingURL=database.js.map