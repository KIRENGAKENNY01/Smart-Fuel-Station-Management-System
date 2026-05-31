import { z } from "zod";
import { objectId } from "./common.js";

const latitude = z.coerce
  .number()
  .min(-90, "Latitude must be between -90 and 90")
  .max(90, "Latitude must be between -90 and 90");

const longitude = z.coerce
  .number()
  .min(-180, "Longitude must be between -180 and 180")
  .max(180, "Longitude must be between -180 and 180");

export const nearbyQuerySchema = z.object({
  lat: latitude,
  lon: longitude,
  distance: z.coerce.number().int().min(100).max(100000).optional().default(5000),
});

export const createStationSchema = z.object({
  name: z.string().trim().min(2, "Station name must be at least 2 characters").max(120),
  latitude,
  longitude,
  manager_id: objectId.optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

export const updateStationSchema = z
  .object({
    name: z.string().trim().min(2).max(120).optional(),
    latitude: latitude.optional(),
    longitude: longitude.optional(),
    manager_id: objectId.optional(),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  })
  .refine((d) => Object.keys(d).length > 0, {
    message: "At least one field is required to update",
  });

export const assignManagerSchema = z.object({
  managerId: objectId,
});
