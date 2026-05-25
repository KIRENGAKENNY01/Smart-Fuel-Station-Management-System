import { z } from "zod";
import { objectId, email, positiveNumber } from "./common.js";

export const createTransactionSchema = z.object({
  stationId: objectId,
  fuelType: objectId,
  liters: positiveNumber.min(0.1, "Minimum purchase is 0.1 liters").max(5000, "Maximum purchase is 5000 liters"),
});

export const historyQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(10),
    dateFrom: z.string().trim().optional(),
    dateTo: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.dateFrom && data.dateTo && data.dateFrom > data.dateTo) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "dateFrom must be before or equal to dateTo",
        path: ["dateTo"],
      });
    }
  });

export const emailReceiptSchema = z.object({
  email: email.optional(),
});

export const adminStatsQuerySchema = z.object({
  period: z.enum(["daily", "weekly", "monthly"]).optional().default("daily"),
});

export const managerStatsQuerySchema = z.object({
  stationId: objectId.optional(),
});

export const stationSalesQuerySchema = z.object({
  status: z.enum(["PENDING", "COMPLETED", "FAILED"]).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});
