import e, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { referralSchema } from "../utils/validation";
import { sendMail } from "../utils/email";

const prisma = new PrismaClient();

export const getReferrals = async (req: Request, res: Response) => {
  try {
    const referrals = await prisma.referral.findMany();
    res.status(200).json(referrals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createReferral = async (req: Request, res: Response) => {
  const { referral } = req.body;

  try {
    const validatedReferral = referralSchema.parse(referral);

    const createdReferral = await prisma.referral.create({
      data: {
        referrerName: validatedReferral.fullName,
        referrerEmail: validatedReferral.email,
        refereeName: validatedReferral.refereeName,
        refereeEmail: validatedReferral.refereeEmail,
        program: validatedReferral.program,
        message: validatedReferral.message,
      },
    });

    // send email
    const info = await sendMail(validatedReferral);
    console.log("Message sent: %s", info.messageId, info.response);

    res.status(200).json({
      createdReferral,
      success: true,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error || error instanceof z.ZodError) {
      return res.status(400).json({ message: error.message, success: false });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};
