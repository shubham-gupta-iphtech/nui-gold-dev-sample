import { z } from "zod";

import {
  registerSchema,
  businessInfoSchema,
  employeeSchema,
  amlQuestionnaireSchema,
  resaleCertificateSchema,
} from "./auth.validation";

export type RegisterInput =
  z.infer<typeof registerSchema>;

export type BusinessInfoInput =
  z.infer<typeof businessInfoSchema>;

export type EmployeeInput =
  z.infer<typeof employeeSchema>;

export type AMLQuestionnaireInput =
  z.infer<typeof amlQuestionnaireSchema>;

export type ResaleCertificateInput =
  z.infer<typeof resaleCertificateSchema>;