"use strict";
/**
 * Email Utility — sends emails to users.
 *
 * ⚠️  STUB IMPLEMENTATION:
 * Right now this just prints the email to the console so you can see it working.
 * When you're ready for real emails, replace the console.log calls with
 * a real email service like Nodemailer, SendGrid, or AWS SES.
 *
 * To use Nodemailer later:
 *   1. npm install nodemailer @types/nodemailer
 *   2. Create a transporter with your SMTP credentials
 *   3. Replace the console.log below with transporter.sendMail(...)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWelcomeEmail = sendWelcomeEmail;
/**
 * Sends a "Welcome / Verify Your Email" message to a newly registered user.
 * The email includes their temporary password so they can log in.
 */
async function sendWelcomeEmail(options) {
    // ─── TODO: Replace this stub with real email logic ────────────────────────
    console.log("─".repeat(60));
    console.log("📧  [EMAIL STUB] Welcome Email");
    console.log(`    To:       ${options.to}`);
    console.log(`    Name:     ${options.name}`);
    console.log(`    Password: ${options.tempPassword}`);
    console.log("    → In production this sends a real email via SMTP/SendGrid.");
    console.log("─".repeat(60));
    // ─────────────────────────────────────────────────────────────────────────
}
//# sourceMappingURL=email.util.js.map