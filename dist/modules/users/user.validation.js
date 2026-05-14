"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTraderSchema = exports.loginSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
// ─── Existing schemas (unchanged) ─────────────────────────────────────────────
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.updateUserSchema = exports.createUserSchema.partial();
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
// ─── Registration schemas ──────────────────────────────────────────────────────
// Business info validation
const businessInfoSchema = zod_1.z.object({
    business_name: zod_1.z.string().min(2, "Business name must be at least 2 characters"),
    owner_first_name: zod_1.z.string().min(1, "Owner first name is required"),
    owner_last_name: zod_1.z.string().min(1, "Owner last name is required"),
    street_address: zod_1.z.string().min(5, "Street address is required"),
    city: zod_1.z.string().min(1, "City is required"),
    state: zod_1.z.string().min(1, "State is required"),
    postal_code: zod_1.z.string().min(3, "Postal code is required"),
    country: zod_1.z.string().min(2, "Country is required"),
    email: zod_1.z.string().email("Business email must be a valid email address"),
});
/**
 * Employee validation.
 *
 * The "role" field only accepts "trading" or "view_only".
 * If "admin" or anything else is sent, Zod will reject it with an error message.
 * The controller then sends that as a 422 (Unprocessable Entity).
 */
const employeeSchema = zod_1.z.object({
    first_name: zod_1.z.string().min(1, "Employee first name is required"),
    last_name: zod_1.z.string().min(1, "Employee last name is required"),
    email: zod_1.z.string().email("Employee email must be a valid email address"),
    role: zod_1.z.enum(["trading", "view_only"], {
        error: 'Employee role must be "trading" or "view_only". Assigning admin-level access during registration is not allowed.',
    }),
});
/**
 * Resale certificate validation.
 *
 * Certificate number format: "RC-" followed by 6–12 uppercase letters or digits.
 * Valid examples:  RC-ABC123   RC-GOLD2024
 * Invalid example: ABC-123     rc-abc123   12345
 */
const resaleCertificateSchema = zod_1.z.object({
    certificate_number: zod_1.z
        .string()
        .regex(/^RC-[A-Z0-9]{6,12}$/, 'Invalid resale certificate number. Expected format: RC-XXXXXX (e.g. "RC-ABC123")'),
    signature: zod_1.z.string().min(1, "Signature is required"),
    print_name: zod_1.z.string().min(1, "Print name is required"),
    title: zod_1.z.string().min(1, "Title/position is required"),
    signed_date: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Signed date must be in YYYY-MM-DD format (e.g. "2024-01-15")'),
});
/**
 * AML questionnaire validation.
 *
 * All three boolean fields are required — you MUST send true or false.
 * Leaving them out (undefined) will return a 400 error.
 */
const amlQuestionnaireSchema = zod_1.z.object({
    aml_policy: zod_1.z.boolean({
        error: "AML policy answer is required (true = Yes, false = No)",
    }),
    independent_audit: zod_1.z.boolean({
        error: "Independent audit answer is required (true = Yes, false = No)",
    }),
    aml_training_program: zod_1.z.boolean({
        error: "AML training program answer is required (true = Yes, false = No)",
    }),
    auditor_name: zod_1.z.string().min(1, "Auditor name is required"),
    auditor_contact: zod_1.z.string().min(1, "Auditor contact (email or phone) is required"),
    auditor_details: zod_1.z.string().min(1, "Auditor details are required"),
});
// ─── The full registration schema ─────────────────────────────────────────────
exports.registerTraderSchema = zod_1.z.object({
    business_info: businessInfoSchema,
    employees: zod_1.z.array(employeeSchema), // Can be an empty array
    resale_certificate: resaleCertificateSchema,
    aml_questionnaire: amlQuestionnaireSchema,
});
//# sourceMappingURL=user.validation.js.map