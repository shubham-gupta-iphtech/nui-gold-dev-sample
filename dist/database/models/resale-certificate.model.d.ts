import { Model } from "sequelize-typescript";
import { Business } from "./business.model";
export interface ResaleCertificateAttributes {
    id: number;
    business_id: number;
    certificate_number: string;
    signature: string;
    print_name: string;
    title: string;
    signed_date: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface CreateResaleCertificateInput extends Omit<ResaleCertificateAttributes, "id" | "createdAt" | "updatedAt"> {
}
export declare class ResaleCertificate extends Model<ResaleCertificateAttributes, CreateResaleCertificateInput> {
    id: number;
    business_id: number;
    business: Business;
    certificate_number: string;
    signature: string;
    print_name: string;
    title: string;
    signed_date: Date;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=resale-certificate.model.d.ts.map