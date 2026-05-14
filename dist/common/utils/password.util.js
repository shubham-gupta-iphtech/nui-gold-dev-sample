"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePassword = generatePassword;
const crypto_1 = __importDefault(require("crypto"));
/**
 * Generates a random 12-character secure password.
 *
 * We do this on the backend so the frontend never needs to send a password.
 * The plain-text version is emailed to the user, the hashed version is stored in the DB.
 */
function generatePassword() {
    // Characters we allow in generated passwords (no ambiguous chars like 0, O, l, 1)
    const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%";
    let password = "";
    const randomBytes = crypto_1.default.randomBytes(12);
    for (let i = 0; i < 12; i++) {
        // Pick a random character from the allowed list
        password += chars[randomBytes[i] % chars.length];
    }
    return password;
}
//# sourceMappingURL=password.util.js.map