import { z } from "zod";

const programOptions = [
  "Data Science",
  "Product Management",
  "Business Analytics",
  "Digital Transformation",
  "Business Management",
  "Project Management",
  "Strategy & Leadership",
  "Senior Management",
  "Fintech",
] as const;

export const referralSchema = z.object({
  fullName: z.string().min(2).max(50),
  email: z.string().email(),
  refereeName: z.string().min(2).max(50),
  refereeEmail: z.string().email(),
  program: z.enum(programOptions),
  message: z.string().max(500).optional(),
});
