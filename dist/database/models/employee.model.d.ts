import { Model } from "sequelize-typescript";
import { Business } from "./business.model";
export interface EmployeeAttributes {
    id: number;
    business_id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    accessibility: "trading" | "view_only";
    createdAt?: Date;
    updatedAt?: Date;
}
export interface CreateEmployeeInput extends Omit<EmployeeAttributes, "id" | "createdAt" | "updatedAt"> {
}
export declare class Employee extends Model<EmployeeAttributes, CreateEmployeeInput> {
    id: number;
    business_id: number;
    business: Business;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    accessibility: "trading" | "view_only";
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=employee.model.d.ts.map