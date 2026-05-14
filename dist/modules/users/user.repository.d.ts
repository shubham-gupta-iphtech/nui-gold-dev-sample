import { Transaction } from "sequelize";
import { CreateUserInput, User } from "../../database/models/user.model";
import { Business, CreateBusinessInput } from "../../database/models/business.model";
import { Employee, CreateEmployeeInput } from "../../database/models/employee.model";
import { ResaleCertificate, CreateResaleCertificateInput } from "../../database/models/resale-certificate.model";
import { AMLQuestionnaire, CreateAMLQuestionnaireInput } from "../../database/models/aml-questionnaire.model";
export declare class UserRepository {
    /** Create a new User row. Optionally pass a transaction to include it in a larger atomic operation. */
    static create(data: CreateUserInput, transaction?: Transaction): Promise<User>;
    static findByEmail(email: string): Promise<User | null>;
    static findById(id: string): Promise<User | null>;
    static findAll(): Promise<User[]>;
    static update(id: string, data: Partial<CreateUserInput>): Promise<User | null>;
    static delete(id: string): Promise<number>;
    /** Check if a business with this email already exists (used to prevent duplicates). */
    static findBusinessByEmail(email: string): Promise<Business | null>;
    /** Save a new Business row inside a transaction. */
    static createBusiness(data: CreateBusinessInput, transaction: Transaction): Promise<Business>;
    /** Check if an employee with this email already exists (used to prevent duplicates). */
    static findEmployeeByEmail(email: string): Promise<Employee | null>;
    /** Save a new Employee row inside a transaction. */
    static createEmployee(data: CreateEmployeeInput, transaction: Transaction): Promise<Employee>;
    /** Save a new ResaleCertificate row inside a transaction. */
    static createResaleCertificate(data: CreateResaleCertificateInput, transaction: Transaction): Promise<ResaleCertificate>;
    /** Save a new AMLQuestionnaire row inside a transaction. */
    static createAMLQuestionnaire(data: CreateAMLQuestionnaireInput, transaction: Transaction): Promise<AMLQuestionnaire>;
}
//# sourceMappingURL=user.repository.d.ts.map