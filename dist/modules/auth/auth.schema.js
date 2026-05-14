"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterPayloadSchema = exports.AMLQuestionnaireSchema = exports.ResaleCertificateSchema = exports.EmployeeSchema = exports.BusinessInfoSchema = void 0;
const zod_1 = require("zod");
exports.BusinessInfoSchema = zod_1.z.object({
    business_name: zod_1.z.string().min(1, "Business name is required"),
    owner_first_name: zod_1.z.string().min(1, "Owner first name is required"),
    owner_last_name: zod_1.z.string().min(1, "Owner last name is required"),
    street_address: zod_1.z.string().min(1, "Street address is required"),
    city: zod_1.z.string().min(1, "City is required"),
    state: zod_1.z.string().min(1, "State is required"),
    postal_code: zod_1.z.string().min(1, "Postal code is required"),
    country: zod_1.z.string().min(1, "Country is required"),
    email: zod_1.z.string().email("Invalid business email"),
});
exports.EmployeeSchema = zod_1.z.object({
    first_name: zod_1.z.string().min(1, "Employee first name is required"),
    last_name: zod_1.z.string().min(1, "Employee last name is required"),
    email: zod_1.z.string().email("Invalid employee email"),
    role: zod_1.z.enum(["trading", "view_only", "admin"]),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters").optional(), // Can be auto-generated if not provided
});
exports.ResaleCertificateSchema = zod_1.z.object({
    certificate_number: zod_1.z
        .string()
        .regex(/^[A-Za-z0-9-]+$/, "Invalid Resale Certificate Number format"),
    signature: zod_1.z.string().min(1, "Signature is required"),
    print_name: zod_1.z.string().min(1, "Print name is required"),
    title: zod_1.z.string().min(1, "Title is required"),
    signed_date: zod_1.z.string().datetime({ offset: true }).or(zod_1.z.string().date()).or(zod_1.z.date()),
});
exports.AMLQuestionnaireSchema = zod_1.z.object({
    aml_policy: zod_1.z.boolean({ required_error: "Mandatory AML question (aml_policy) must be a boolean (Yes/No)" }),
    independent_audit: zod_1.z.boolean({ required_error: "Mandatory AML question (independent_audit) must be a boolean (Yes/No)" }),
    aml_training_program: zod_1.z.boolean({ required_error: "Mandatory AML question (aml_training_program) must be a boolean (Yes/No)" }),
    auditor_name: zod_1.z.string(),
    auditor_contact: zod_1.z.string(),
    auditor_details: zod_1.z.string(),
});
exports.RegisterPayloadSchema = zod_1.z.object({
    business_info: exports.BusinessInfoSchema,
    employees: zod_1.z.array(exports.EmployeeSchema).min(1, "At least one employee is required"),
    resale_certificate: exports.ResaleCertificateSchema,
    aml_questionnaire: exports.AMLQuestionnaireSchema,
});
//# sourceMappingURL=auth.schema.js.map