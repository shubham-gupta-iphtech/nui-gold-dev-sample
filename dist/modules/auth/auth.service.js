"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerBusinessAndEmployees = exports.AuthError = void 0;
const database_1 = require("../../config/database");
const business_model_1 = require("../../database/models/business.model");
const employee_model_1 = require("../../database/models/employee.model");
const resale_certificate_model_1 = require("../../database/models/resale-certificate.model");
const aml_questionnaire_model_1 = require("../../database/models/aml-questionnaire.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
class AuthError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = "AuthError";
    }
}
exports.AuthError = AuthError;
const registerBusinessAndEmployees = async (payload) => {
    const { business_info, employees, resale_certificate, aml_questionnaire } = payload;
    // 1. Semantic Validation
    const hasAdminRole = employees.some((emp) => emp.role === "admin");
    if (hasAdminRole) {
        throw new AuthError("Cannot assign 'Admin' permissions during registration to employees.", 422);
    }
    // 2. Check for existing emails
    const existingBusiness = await business_model_1.Business.findOne({
        where: { email: business_info.email },
    });
    if (existingBusiness) {
        throw new AuthError("Business email already exists in the system.", 400);
    }
    for (const emp of employees) {
        const existingEmployee = await employee_model_1.Employee.findOne({
            where: { email: emp.email },
        });
        if (existingEmployee) {
            throw new AuthError(`Employee email ${emp.email} already exists in the system.`, 400);
        }
    }
    // 3. Database Transaction
    const transaction = await database_1.sequelize.transaction();
    try {
        // Create Business
        const business = await business_model_1.Business.create({ ...business_info }, { transaction });
        // Create Resale Certificate
        await resale_certificate_model_1.ResaleCertificate.create({
            ...resale_certificate,
            business_id: business.id,
            signed_date: new Date(resale_certificate.signed_date),
        }, { transaction });
        // Create AML Questionnaire
        await aml_questionnaire_model_1.AMLQuestionnaire.create({
            ...aml_questionnaire,
            business_id: business.id,
        }, { transaction });
        // Create Employees
        for (const emp of employees) {
            // Generate a random password if not provided
            const rawPassword = emp.password || crypto_1.default.randomBytes(8).toString("hex");
            const hashedPassword = await bcrypt_1.default.hash(rawPassword, 10);
            await employee_model_1.Employee.create({
                business_id: business.id,
                first_name: emp.first_name,
                last_name: emp.last_name,
                email: emp.email,
                password: hashedPassword,
                accessibility: emp.role,
            }, { transaction });
        }
        // Commit Transaction
        await transaction.commit();
        // 4. Trigger Email Verification Flow (Mock)
        console.log(`[EMAIL_MOCK] Sending Welcome/Verify Email to primary business email: ${business_info.email}`);
        employees.forEach(emp => {
            console.log(`[EMAIL_MOCK] Sending Welcome/Verify Email to employee email: ${emp.email}`);
        });
        return {
            message: "Registration Successful",
        };
    }
    catch (error) {
        await transaction.rollback();
        throw error;
    }
};
exports.registerBusinessAndEmployees = registerBusinessAndEmployees;
//# sourceMappingURL=auth.service.js.map