import express from "express";
import * as NotificationController from "../controllers/notification.controller.js";
import { authMiddleware } from "@smart-fuel/shared";

const router = express.Router();

router.get("/", authMiddleware, NotificationController.getNotifications);
router.put("/:id/read", authMiddleware, NotificationController.markRead);
router.post("/internal", NotificationController.createInternal);

export default router;
