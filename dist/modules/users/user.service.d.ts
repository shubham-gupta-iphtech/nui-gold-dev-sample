import { CreateUserInput } from "../../database/models/user.model";
import { TraderRegistrationInput } from "./user.types";
export declare class UserService {
    /**
     * Registers a new trader business account.
     *
     * This method:
     *  1. Validates that no duplicate emails exist (business OR employee)
     *  2. Validates employee roles (no "admin" allowed — throws 422)
     *  3. Generates a random password for each user (business owner + employees)
     *  4. Saves everything in ONE atomic database transaction
     *     → If anything fails, ALL changes are rolled back (nothing is saved)
     *  5. After a successful save, sends welcome emails with the temp password
     */
    static registerTrader(data: TraderRegistrationInput): Promise<{
        business_id: number;
        business_name: string;
        owner_email: string;
        employees_created: number;
    }>;
    static createUser(data: CreateUserInput): Promise<import("../../database/models/user.model").User>;
    static getUser(id: string): Promise<import("../../database/models/user.model").User>;
    static getUsers(): Promise<import("../../database/models/user.model").User[]>;
    static updateUser(id: string, data: Partial<CreateUserInput>): Promise<import("../../database/models/user.model").User | null>;
    static deleteUser(id: string): Promise<boolean>;
    static loginUser(email: string, password: string): Promise<{
        id: number;
        name: string;
        email: string;
        role: "trader" | "admin";
    }>;
}
//# sourceMappingURL=user.service.d.ts.map