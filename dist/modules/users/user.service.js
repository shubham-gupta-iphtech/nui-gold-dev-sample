"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const app_error_1 = require("../../common/errors/app-error");
const database_1 = require("../../config/database");
const password_util_1 = require("../../common/utils/password.util");
const email_util_1 = require("../../common/utils/email.util");
const user_repository_1 = require("./user.repository");
class UserService {
    // ─── Trader Registration ───────────────────────────────────────────────────
    /**
     * Registers a new trader business account.
     *
     * This method:
     *  1. Validates that no duplicate emails exist (business OR employee)
     *  2. Validates employee roles (no "admin" allowed — throws 422)
     *  3. Generates a random password for each user (business owner + employees)
     *  4. Saves everything in ONE atomic database transaction
     *     → If anything fails, ALL changes are rolled back (nothing is saved)
     *  5. After a successful save, sends welcome emails with the temp password
     */
    static async registerTrader(data) {
        const { business_info, employees, resale_certificate, aml_questionnaire } = data;
        // ── STEP 1: Duplicate email checks (before touching the database) ──────
        // Check if the primary business email is already registered
        const existingUserWithBusinessEmail = await user_repository_1.UserRepository.findByEmail(business_info.email);
        if (existingUserWithBusinessEmail) {
            throw new app_error_1.AppError(`Business email "${business_info.email}" is already registered.`, 400);
        }
        const existingBusiness = await user_repository_1.UserRepository.findBusinessByEmail(business_info.email);
        if (existingBusiness) {
            throw new app_error_1.AppError(`A business with email "${business_info.email}" already exists.`, 400);
        }
        // Check each employee email for duplicates
        const seenEmails = new Set();
        seenEmails.add(business_info.email.toLowerCase()); // prevent owner + employee same email
        for (const emp of employees) {
            const lowerEmail = emp.email.toLowerCase();
            // Check for duplicates within the employees array itself
            if (seenEmails.has(lowerEmail)) {
                throw new app_error_1.AppError(`Duplicate email found in employees list: "${emp.email}".`, 400);
            }
            seenEmails.add(lowerEmail);
            // Check against existing Employee records
            const existingEmployee = await user_repository_1.UserRepository.findEmployeeByEmail(emp.email);
            if (existingEmployee) {
                throw new app_error_1.AppError(`Employee email "${emp.email}" is already registered.`, 400);
            }
            // Check against existing User records
            const existingUser = await user_repository_1.UserRepository.findByEmail(emp.email);
            if (existingUser) {
                throw new app_error_1.AppError(`Email "${emp.email}" is already registered in the system.`, 400);
            }
        }
        // ── STEP 2: Role validation (422 check) ───────────────────────────────
        // Even though Zod schema already restricts this, we double-check here
        // to be very explicit. If "admin" is passed as an employee role,
        // we return 422 (Unprocessable Entity — semantically wrong request).
        for (const emp of employees) {
            if (emp.role !== "trading" && emp.role !== "view_only") {
                throw new app_error_1.AppError(`Invalid role "${emp.role}" for employee "${emp.email}". ` +
                    `Only "trading" or "view_only" are allowed. ` +
                    `Admin-level access cannot be assigned during registration.`, 422);
            }
        }
        // ── STEP 3: Generate password for the business owner ──────────────────
        const ownerRawPassword = (0, password_util_1.generatePassword)(); // plain text (to be emailed)
        const ownerHashedPassword = await bcrypt_1.default.hash(ownerRawPassword, 10); // hashed (to be stored)
        // ── STEP 4: Start a database transaction ──────────────────────────────
        // Think of a transaction like a "draft" — nothing is actually saved
        // until we call commit(). If anything goes wrong, rollback() undoes everything.
        const transaction = await database_1.sequelize.transaction();
        try {
            // Save the Business record first (we need its ID for other records)
            const business = await user_repository_1.UserRepository.createBusiness({
                business_name: business_info.business_name,
                owner_first_name: business_info.owner_first_name,
                owner_last_name: business_info.owner_last_name,
                street_address: business_info.street_address,
                city: business_info.city,
                state: business_info.state,
                postal_code: business_info.postal_code,
                country: business_info.country,
                email: business_info.email,
            }, transaction);
            // Create the primary User account for the business owner
            // This is what they use to log in (email + generated password)
            const ownerFullName = `${business_info.owner_first_name} ${business_info.owner_last_name}`;
            await user_repository_1.UserRepository.create({
                name: ownerFullName,
                email: business_info.email,
                password: ownerHashedPassword,
                role: "trader",
            }, transaction);
            // Keep a list of employee passwords so we can email them after commit
            const employeeEmailList = [];
            // Create an Employee record for each person in the employees array
            for (const emp of employees) {
                const empRawPassword = (0, password_util_1.generatePassword)(); // unique password per employee
                const empHashedPassword = await bcrypt_1.default.hash(empRawPassword, 10);
                await user_repository_1.UserRepository.createEmployee({
                    business_id: business.id,
                    first_name: emp.first_name,
                    last_name: emp.last_name,
                    email: emp.email,
                    password: empHashedPassword, // hashed version goes to DB
                    accessibility: emp.role, // "trading" or "view_only"
                }, transaction);
                // Remember the plain-text password so we can email it
                employeeEmailList.push({
                    email: emp.email,
                    name: `${emp.first_name} ${emp.last_name}`,
                    rawPassword: empRawPassword,
                });
            }
            // Save the Resale Certificate (linked to this business)
            await user_repository_1.UserRepository.createResaleCertificate({
                business_id: business.id,
                certificate_number: resale_certificate.certificate_number,
                signature: resale_certificate.signature,
                print_name: resale_certificate.print_name,
                title: resale_certificate.title,
                signed_date: new Date(resale_certificate.signed_date),
            }, transaction);
            // Save the AML Questionnaire (linked to this business)
            await user_repository_1.UserRepository.createAMLQuestionnaire({
                business_id: business.id,
                aml_policy: aml_questionnaire.aml_policy,
                independent_audit: aml_questionnaire.independent_audit,
                aml_training_program: aml_questionnaire.aml_training_program,
                auditor_name: aml_questionnaire.auditor_name,
                auditor_contact: aml_questionnaire.auditor_contact,
                auditor_details: aml_questionnaire.auditor_details,
            }, transaction);
            // ── All DB saves succeeded → make them permanent ───────────────────
            await transaction.commit();
            // ── STEP 5: Send welcome emails (after commit so DB is safe) ──────
            // Send to the business owner
            await (0, email_util_1.sendWelcomeEmail)({
                to: business_info.email,
                name: ownerFullName,
                tempPassword: ownerRawPassword,
            });
            // Send to each employee
            for (const emp of employeeEmailList) {
                await (0, email_util_1.sendWelcomeEmail)({
                    to: emp.email,
                    name: emp.name,
                    tempPassword: emp.rawPassword,
                });
            }
            // ── Return summary data for the 201 response ───────────────────────
            return {
                business_id: business.id,
                business_name: business.business_name,
                owner_email: business_info.email,
                employees_created: employees.length,
            };
        }
        catch (error) {
            // Something went wrong → undo ALL database changes from this transaction
            // This ensures we never end up with partial data (e.g. a Business but no User)
            await transaction.rollback();
            // Re-throw so the error middleware can send the right HTTP response
            throw error;
        }
    }
    // ─── Existing user operations (unchanged) ─────────────────────────────────
    static async createUser(data) {
        const existingUser = await user_repository_1.UserRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error("Email already exists");
        }
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        const user = await user_repository_1.UserRepository.create({ ...data, password: hashedPassword });
        return user;
    }
    static async getUser(id) {
        const user = await user_repository_1.UserRepository.findById(id);
        if (!user)
            throw new Error("User not found");
        return user;
    }
    static async getUsers() {
        return user_repository_1.UserRepository.findAll();
    }
    static async updateUser(id, data) {
        const user = await user_repository_1.UserRepository.findById(id);
        if (!user)
            throw new Error("User not found");
        if (data.password) {
            data.password = await bcrypt_1.default.hash(data.password, 10);
        }
        return user_repository_1.UserRepository.update(id, data);
    }
    static async deleteUser(id) {
        const user = await user_repository_1.UserRepository.findById(id);
        if (!user)
            throw new Error("User not found");
        await user_repository_1.UserRepository.delete(id);
        return true;
    }
    static async loginUser(email, password) {
        const user = await user_repository_1.UserRepository.findByEmail(email);
        if (!user)
            throw new app_error_1.AppError("User not found", 404);
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid)
            throw new app_error_1.AppError("Invalid password", 401);
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map