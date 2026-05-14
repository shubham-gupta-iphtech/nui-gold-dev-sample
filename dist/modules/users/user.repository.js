"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_model_1 = require("../../database/models/user.model");
const business_model_1 = require("../../database/models/business.model");
const employee_model_1 = require("../../database/models/employee.model");
const resale_certificate_model_1 = require("../../database/models/resale-certificate.model");
const aml_questionnaire_model_1 = require("../../database/models/aml-questionnaire.model");
class UserRepository {
    // ─── User operations (unchanged) ──────────────────────────────────────────
    /** Create a new User row. Optionally pass a transaction to include it in a larger atomic operation. */
    static async create(data, transaction) {
        return user_model_1.User.create(data, { transaction });
    }
    static async findByEmail(email) {
        return user_model_1.User.findOne({ where: { email } });
    }
    static async findById(id) {
        return user_model_1.User.findByPk(id);
    }
    static async findAll() {
        return user_model_1.User.findAll();
    }
    static async update(id, data) {
        await user_model_1.User.update(data, { where: { id } });
        return this.findById(id);
    }
    static async delete(id) {
        return user_model_1.User.destroy({ where: { id } });
    }
    // ─── Business operations ──────────────────────────────────────────────────
    /** Check if a business with this email already exists (used to prevent duplicates). */
    static async findBusinessByEmail(email) {
        return business_model_1.Business.findOne({ where: { email } });
    }
    /** Save a new Business row inside a transaction. */
    static async createBusiness(data, transaction) {
        return business_model_1.Business.create(data, { transaction });
    }
    // ─── Employee operations ──────────────────────────────────────────────────
    /** Check if an employee with this email already exists (used to prevent duplicates). */
    static async findEmployeeByEmail(email) {
        return employee_model_1.Employee.findOne({ where: { email } });
    }
    /** Save a new Employee row inside a transaction. */
    static async createEmployee(data, transaction) {
        return employee_model_1.Employee.create(data, { transaction });
    }
    // ─── Resale Certificate operations ────────────────────────────────────────
    /** Save a new ResaleCertificate row inside a transaction. */
    static async createResaleCertificate(data, transaction) {
        return resale_certificate_model_1.ResaleCertificate.create(data, { transaction });
    }
    // ─── AML Questionnaire operations ─────────────────────────────────────────
    /** Save a new AMLQuestionnaire row inside a transaction. */
    static async createAMLQuestionnaire(data, transaction) {
        return aml_questionnaire_model_1.AMLQuestionnaire.create(data, { transaction });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map