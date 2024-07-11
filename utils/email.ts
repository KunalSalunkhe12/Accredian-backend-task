import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { z } from "zod";
import { referralSchema } from "./validation";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  debug: true,
  auth: {
    user: process.env.GOOGLE_APP_USER,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

export const sendMail = async ({
  fullName,
  refereeName,
  refereeEmail,
  program,
  message,
}: z.infer<typeof referralSchema>) => {
  const info = await transporter.sendMail({
    from: `Accredian <${process.env.GOOGLE_APP_USER}>`,
    to: refereeEmail,
    subject: `Referral for ${program} Program`,
    text: `Hello ${refereeName},\n\n${fullName} has referred you for the ${program} program. Here is the message from ${fullName}:\n\n${message}\n\nBest Regards,\nAccredian Team`,
  });

  return info;
};
