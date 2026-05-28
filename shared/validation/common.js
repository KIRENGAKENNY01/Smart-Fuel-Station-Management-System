import { z } from "zod";

export const objectId = z
  .string()
  .trim()
  .min(1, "Id is required");

export const email = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Invalid email address")
  .max(254, "Email is too long");

export const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password is too long")
  .regex(/[A-Za-z]/, "Password must contain at least one letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const fullName = z
  .string()
  .trim()
  .min(2, "Full name must be at least 2 characters")
  .max(100, "Full name is too long");

export const positiveNumber = z.coerce.number().positive("Must be greater than 0");

export const nonNegativeNumber = z.coerce.number().min(0, "Cannot be negative");

export const mongoIdParam = z.object({ id: objectId });

export const stationIdParam = z.object({ stationId: objectId });
