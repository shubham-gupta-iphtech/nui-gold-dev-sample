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
export interface WelcomeEmailOptions {
    to: string;
    name: string;
    tempPassword: string;
}
/**
 * Sends a "Welcome / Verify Your Email" message to a newly registered user.
 * The email includes their temporary password so they can log in.
 */
export declare function sendWelcomeEmail(options: WelcomeEmailOptions): Promise<void>;
//# sourceMappingURL=email.util.d.ts.map