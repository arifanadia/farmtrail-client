import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(2, "Username is too short")
    .max(50, "Username is too long"),
  email: z
    .string()
    .email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number"),
  confirmPassword: z
    .string()
    .min(6, "Confirm Password must match password"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

export const loginSchema = z.object({
    email: z
      .string()
      .email("Invalid email format"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  });
  