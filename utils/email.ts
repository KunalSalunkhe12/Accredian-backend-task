import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { z } from "zod";
import { referralSchema } from "./types";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  debug: true,
  auth: {
    user: "info@biisiiventures.com",
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendMail = async ({
  fullName,
  email,
  refereeName,
  refereeEmail,
  program,
  message,
}: z.infer<typeof referralSchema>) => {
  const info = await transporter.sendMail({
    from: "BIISII VENTURE <info@biisiiventures.com>",
    to: "info@biisiiventures.com",
    subject: `New Contact: ${fullName}`,
    text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${program}\nMessage: ${message}`,
  });

  return info;
};
