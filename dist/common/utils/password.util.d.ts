/**
 * Generates a random 12-character secure password.
 *
 * We do this on the backend so the frontend never needs to send a password.
 * The plain-text version is emailed to the user, the hashed version is stored in the DB.
 */
export declare function generatePassword(): string;
//# sourceMappingURL=password.util.d.ts.map