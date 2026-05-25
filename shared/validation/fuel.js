import { z } from "zod";
import { objectId, positiveNumber, nonNegativeNumber } from "./common.js";

export const fuelSupplySchema = z.object({
  station_id: objectId,
  fuel_type_id: objectId,
  liters_added: positiveNumber.max(1_000_000, "Liters value is too large"),
});

export const fuelPriceSchema = z.object({
  station_id: objectId,
  fuel_type_id: objectId,
  price: positiveNumber.max(100_000, "Price per liter is too high"),
});

export const fuelInventoryLevelSchema = z.object({
  station_id: objectId,
  fuel_type_id: objectId,
  liters: nonNegativeNumber.max(1_000_000, "Liters value is too large"),
});

export const stockUpdateSchema = z.object({
  station_id: objectId,
  fuel_type_id: objectId,
  amount: positiveNumber.max(1_000_000, "Amount is too large"),
  operation: z.enum(["add", "subtract"], {
    errorMap: () => ({ message: "operation must be add or subtract" }),
  }),
});

export const priceTrendQuerySchema = z.object({
  fuelType: objectId,
  range: z.enum(["7d", "30d", "daily", "weekly", "monthly"]).optional(),
});
