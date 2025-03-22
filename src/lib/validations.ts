import {z} from "zod";

export const ContactSchema = z.object({
  email: z.string().email({message: "Please enter a valid email"}),
  name: z.string().min(1, "Please enter your name").max(150),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  message: z.string().min(5, "Please enter your message").max(1500)
});

export const MembershipSchema = z.object({
  name: z.string().min(2, {message: "Please enter your name"}).max(150),
  email: z.string().email({message: "Please enter a valid email"}),
  phone: z.string().refine((value) => /^(\+8801|01)[3-9]\d{8}$/.test(value), {
      message: "Invalid phone number",
    }
  ),
  address: z.string().min(1, {message: "Please enter your address"}).max(255),
  education: z.string(),
  batch: z.coerce.number().min(1, {message: "Please enter a valid batch number"}),
  roll: z.coerce.number().min(1, {message: "Please enter a valid roll number"}).max(255),
  problem_solving_experience: z.string().min(1, {message: "Please enter a problem solving experience"}),
  expectation: z.string().min(1, {message: "Please enter what you expect from the club"}),
  facebook: z.string().nullable(),
  linkedin: z.string().nullable(),
  github: z.string().nullable(),
  transaction_id: z.string().nullable(),
  image: z.any()
      .refine((file) => file?.length > 0, "Image is required")
      .refine(
          (file) => file?.[0]?.size <= 2 * 1024 * 1024, // Limit to 2MB
          "File size should be under 2MB"
      )
      .refine(
          (file) => ["image/jpeg", "image/png"].includes(file?.[0]?.type),
          "Only JPG and PNG are allowed"
      ),
});

export const LoginSchema = z.object({
  email: z.string().email({message: "Please enter a valid email"}),
  password: z.string().min(6, "Please enter your password"),
});