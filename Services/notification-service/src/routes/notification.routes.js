import express from "express";
import * as NotificationController from "../controllers/notification.controller.js";
import {
  authMiddleware,
  validateBody,
  validateParams,
  mongoIdParam,
  createNotificationSchema,
} from "@smart-fuel/shared";

const router = express.Router();

router.get("/", authMiddleware, NotificationController.getNotifications);
router.put("/:id/read", authMiddleware, validateParams(mongoIdParam), NotificationController.markRead);
router.post("/internal", validateBody(createNotificationSchema), NotificationController.createInternal);

export default router;
