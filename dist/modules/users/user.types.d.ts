export interface CreateUserInput {
    name: string;
    email: string;
    password: string;
}
/**
 * Business information sent by the frontend during registration.
 * The "email" field is the primary business email — it also becomes
 * the login email for the business owner's User account.
 */
export interface BusinessInfoInput {
    business_name: string;
    owner_first_name: string;
    owner_last_name: string;
    street_address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    email: string;
}
/**
 * A single employee entry in the registration payload.
 *
 * "role" here maps to the "accessibility" column in the Employee table:
 *   - "trading"   → employee can place and manage trades
 *   - "view_only" → employee can only view data, not trade
 *
 * "admin" is NOT a valid role for employees during registration (returns 422).
 */
export interface RegistrationEmployeeInput {
    first_name: string;
    last_name: string;
    email: string;
    role: "trading" | "view_only";
}
/**
 * Resale certificate document details.
 * The certificate_number must follow the format: RC-XXXXXX (e.g. RC-ABC123).
 */
export interface ResaleCertificateInput {
    certificate_number: string;
    signature: string;
    print_name: string;
    title: string;
    signed_date: string;
}
/**
 * Anti-Money Laundering (AML) compliance questionnaire.
 * All three boolean fields are REQUIRED — they cannot be left empty.
 * They represent Yes (true) / No (false) answers to compliance questions.
 */
export interface AMLQuestionnaireInput {
    aml_policy: boolean;
    independent_audit: boolean;
    aml_training_program: boolean;
    auditor_name: string;
    auditor_contact: string;
    auditor_details: string;
}
/**
 * The full trader registration payload — everything the frontend sends
 * in one single request to POST /api/v1/auth/register.
 */
export interface TraderRegistrationInput {
    business_info: BusinessInfoInput;
    employees: RegistrationEmployeeInput[];
    resale_certificate: ResaleCertificateInput;
    aml_questionnaire: AMLQuestionnaireInput;
}
//# sourceMappingURL=user.types.d.ts.map