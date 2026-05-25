import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, "Name is required with atleat 3 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type UserSchemaType = z.infer<typeof createUserSchema>;
