import { z } from "zod";
import { email, password, fullName, objectId } from "./common.js";

const publicRole = z.enum(["DRIVER", "MANAGER"], {
  errorMap: () => ({ message: "Role must be DRIVER or MANAGER" }),
});

const adminRole = z.enum(["ADMIN", "MANAGER", "DRIVER"]);

export const signupSchema = z
  .object({
    full_name: fullName,
    email,
    password,
    role: publicRole.default("DRIVER"),
    station_id: objectId.optional(),
    application_message: z.string().trim().max(500).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === "MANAGER" && !data.station_id) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "station_id is required for manager registration",
        path: ["station_id"],
      });
    }
  });

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required"),
});

export const refreshSchema = z.object({
  token: z.string().min(1, "Refresh token is required"),
});

export const logoutSchema = refreshSchema;

export const updateProfileSchema = z
  .object({
    full_name: fullName.optional(),
    email: email.optional(),
  })
  .refine((d) => d.full_name !== undefined || d.email !== undefined, {
    message: "At least one of full_name or email is required",
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: password,
  })
  .refine((d) => d.newPassword !== d.currentPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export const adminCreateUserSchema = z
  .object({
    full_name: fullName,
    email,
    password,
    role: adminRole.default("DRIVER"),
    station_id: objectId.optional(),
  });

export const adminUpdateUserSchema = z
  .object({
    full_name: fullName.optional(),
    email: email.optional(),
    password: password.optional(),
    role: adminRole.optional(),
    status: z.enum(["ACTIVE", "SUSPENDED", "PENDING_APPROVAL", "REJECTED"]).optional(),
    station_id: objectId.nullable().optional(),
  })
  .refine((d) => Object.keys(d).length > 0, {
    message: "At least one field is required to update",
  });

export const approveManagerSchema = z.object({
  station_id: objectId.optional(),
});

export const rejectManagerSchema = z.object({
  reason: z.string().trim().max(500).optional(),
});

export const internalSetStationSchema = z.object({
  station_id: objectId,
});
