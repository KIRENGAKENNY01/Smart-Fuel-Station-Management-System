import { z } from "zod";
import { objectId } from "./common.js";

const notificationType = z.enum([
  "PURCHASE_CONFIRMATION",
  "PAYMENT_RECEIPT",
  "PROMOTION",
  "RECEIPT",
  "PRICE_CHANGE",
  "ALERT",
  "LOW_FUEL",
  "FAILED_TRANSACTION",
  "LOW_STOCK",
  "INVENTORY_DROP",
  "ABNORMAL_CONSUMPTION",
  "PAYMENT_PENDING",
]);

export const createNotificationSchema = z.object({
  user_id: objectId,
  type: notificationType,
  message: z.string().trim().min(1, "Message is required").max(1000),
  transaction_id: objectId.optional().nullable(),
});
