import { z } from "zod";
export declare const createUserSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const updateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const registerTraderSchema: z.ZodObject<{
    business_info: z.ZodObject<{
        business_name: z.ZodString;
        owner_first_name: z.ZodString;
        owner_last_name: z.ZodString;
        street_address: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        postal_code: z.ZodString;
        country: z.ZodString;
        email: z.ZodString;
    }, z.core.$strip>;
    employees: z.ZodArray<z.ZodObject<{
        first_name: z.ZodString;
        last_name: z.ZodString;
        email: z.ZodString;
        role: z.ZodEnum<{
            trading: "trading";
            view_only: "view_only";
        }>;
    }, z.core.$strip>>;
    resale_certificate: z.ZodObject<{
        certificate_number: z.ZodString;
        signature: z.ZodString;
        print_name: z.ZodString;
        title: z.ZodString;
        signed_date: z.ZodString;
    }, z.core.$strip>;
    aml_questionnaire: z.ZodObject<{
        aml_policy: z.ZodBoolean;
        independent_audit: z.ZodBoolean;
        aml_training_program: z.ZodBoolean;
        auditor_name: z.ZodString;
        auditor_contact: z.ZodString;
        auditor_details: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=user.validation.d.ts.map