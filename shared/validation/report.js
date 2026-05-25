import { z } from "zod";

export const driverReportQuerySchema = z.object({
  format: z.enum(["json", "txt", "csv"]).optional().default("json"),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});

export const adminReportQuerySchema = z.object({
  period: z.enum(["daily", "weekly", "monthly"]).optional().default("daily"),
});
