import nodemailer from "nodemailer";
import { EmailTemplate } from "./interface/form";

export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendMail(to: string, template: EmailTemplate) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: template.subject,
      html: template.html,
    };

    return this.transporter.sendMail(mailOptions);
  }
}

export const mailService = new MailService();
