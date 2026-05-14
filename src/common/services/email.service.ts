import nodemailer from "nodemailer";

export class EmailService {

  private static transporter =
    nodemailer.createTransport({
      service: "gmail",

      auth: {
        user:
          process.env.EMAIL_USER,

        pass:
          process.env.EMAIL_PASS,
      },
    });

  static async sendSetPasswordEmail(email: string, token: string)  {

    const link =
      `http://localhost:3000/set-password?token=${token}`;

    await this.transporter.sendMail({
      to: email,

      subject:
        "Set Your Password",

      html: `
        <h2>Welcome to NUI Gold</h2>

        <p>
          Click below to set your password:
        </p>

        <a href="${link}">
          Set Password
        </a>

        <p>
          This link expires in 24 hours.
        </p>
      `,
    });
  }


}
