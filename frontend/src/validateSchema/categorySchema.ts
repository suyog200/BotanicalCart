import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required")
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name must be less than 50 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional()
    .or(z.literal("")),
  isActive: z.boolean(),
  image: z
    .instanceof(File, { message: "Image is required" })
    .optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

