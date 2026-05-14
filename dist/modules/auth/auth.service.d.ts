import { RegisterPayload } from "./auth.schema";
export declare class AuthError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number);
}
export declare const registerBusinessAndEmployees: (payload: RegisterPayload) => Promise<{
    message: string;
}>;
//# sourceMappingURL=auth.service.d.ts.map