import { Model } from "sequelize-typescript";
export interface UserAttributes {
    id: number;
    name: string;
    email: string;
    role: "trader" | "admin";
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface CreateUserInput extends Omit<UserAttributes, "id" | "createdAt" | "updatedAt" | "role"> {
    role?: "trader" | "admin";
}
export declare class User extends Model<UserAttributes, CreateUserInput> {
    id: number;
    name: string;
    email: string;
    role: "trader" | "admin";
    password: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=user.model.d.ts.map