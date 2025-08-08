import { z } from "zod";

const emailSchema = z
  .string()
  .email("Invalid email address")
  .regex(/^[^\s@]+@[^\s@]+\.com$/, "Enter a valid email address");

export const LoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const SignupSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: emailSchema,
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const ContactFormSchema = z.object({
  email: emailSchema,
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
