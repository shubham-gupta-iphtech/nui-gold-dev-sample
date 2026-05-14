import { Model } from "sequelize-typescript";
import { Employee } from "./employee.model";
import { ResaleCertificate } from "./resale-certificate.model";
import { AMLQuestionnaire } from "./aml-questionnaire.model";
export interface BusinessAttributes {
    id: number;
    business_name: string;
    owner_first_name: string;
    owner_last_name: string;
    street_address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface CreateBusinessInput extends Omit<BusinessAttributes, "id" | "createdAt" | "updatedAt"> {
}
export declare class Business extends Model<BusinessAttributes, CreateBusinessInput> {
    id: number;
    business_name: string;
    owner_first_name: string;
    owner_last_name: string;
    street_address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    email: string;
    employees: Employee[];
    resale_certificate: ResaleCertificate;
    aml_questionnaire: AMLQuestionnaire;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=business.model.d.ts.map