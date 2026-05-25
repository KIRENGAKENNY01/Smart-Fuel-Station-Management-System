import { z } from 'zod';

export const emailSchema = z
  .string()
  .trim()
  .min(1, 'Email is required')
  .email('Enter a valid email address')
  .max(254, 'Email is too long');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password is too long')
  .regex(/[A-Za-z]/, 'Password must contain at least one letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const fullNameSchema = z
  .string()
  .trim()
  .min(2, 'Full name must be at least 2 characters')
  .max(100, 'Full name is too long');

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const signupSchema = z
  .object({
    full_name: fullNameSchema,
    email: emailSchema,
    password: passwordSchema,
    role: z.enum(['DRIVER', 'MANAGER']),
    station_id: z.string().optional(),
    application_message: z.string().trim().max(500).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === 'MANAGER' && !data.station_id) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please select the station you will manage',
        path: ['station_id'],
      });
    }
  });

export const updateProfileSchema = z
  .object({
    full_name: fullNameSchema,
    email: emailSchema,
  })
  .refine((d) => d.full_name.length > 0 || d.email.length > 0, {
    message: 'Full name and email are required',
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'New passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((d) => d.newPassword !== d.currentPassword, {
    message: 'New password must be different from current password',
    path: ['newPassword'],
  });

export const purchaseSchema = z.object({
  stationId: z.string().min(1, 'Select a station'),
  fuelTypeId: z.string().min(1, 'Select a fuel type'),
  liters: z.coerce
    .number()
    .min(0.1, 'Minimum purchase is 0.1 liters')
    .max(5000, 'Maximum purchase is 5000 liters'),
});

const adminUserBase = {
  full_name: fullNameSchema,
  email: emailSchema,
  role: z.enum(['DRIVER', 'MANAGER', 'ADMIN']),
  station_id: z.string().optional(),
};

export const adminCreateUserSchema = z
  .object({ ...adminUserBase, password: passwordSchema });

export const adminUpdateUserSchema = z
  .object({
    ...adminUserBase,
    password: z.union([passwordSchema, z.literal('')]).optional().transform(e => e === '' ? undefined : e)
  });

export const stationSchema = z.object({
  name: z.string().trim().min(2, 'Station name is required').max(120),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  manager_id: z.string().optional(),
});

export const fuelSupplySchema = z.object({
  fuel_type_id: z.string().min(1, 'Select a fuel type'),
  liters_added: z.coerce.number().positive('Enter liters greater than 0'),
});

export const fuelPriceUpdateSchema = z.object({
  fuel_type_id: z.string().min(1, 'Select a fuel type'),
  price: z.coerce.number().positive('Enter a price greater than 0'),
});

export function validateForm<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } {
  const result = schema.safeParse(data);
  if (result.success) return { success: true, data: result.data };
  const message = result.error.errors.map((e) => e.message).join('. ');
  return { success: false, error: message };
}
