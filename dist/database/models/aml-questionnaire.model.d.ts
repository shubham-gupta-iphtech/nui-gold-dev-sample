import { Model } from "sequelize-typescript";
import { Business } from "./business.model";
export interface AMLQuestionnaireAttributes {
    id: number;
    business_id: number;
    aml_policy: boolean;
    independent_audit: boolean;
    aml_training_program: boolean;
    auditor_name: string;
    auditor_contact: string;
    auditor_details: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface CreateAMLQuestionnaireInput extends Omit<AMLQuestionnaireAttributes, "id" | "createdAt" | "updatedAt"> {
}
export declare class AMLQuestionnaire extends Model<AMLQuestionnaireAttributes, CreateAMLQuestionnaireInput> {
    id: number;
    business_id: number;
    business: Business;
    aml_policy: boolean;
    independent_audit: boolean;
    aml_training_program: boolean;
    auditor_name: string;
    auditor_contact: string;
    auditor_details: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=aml-questionnaire.model.d.ts.map