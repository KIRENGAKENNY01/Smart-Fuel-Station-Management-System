import express from "express";
import * as TransactionController from "../controllers/transaction.controller.js";
import { authMiddleware, authorize, Roles } from "@smart-fuel/shared";

const router = express.Router();

// User History & Payments
router.post("/", authMiddleware, TransactionController.createTransaction);
router.get("/history", authMiddleware, TransactionController.getMyHistory);

// Admin/Manager: Station Sales
router.get("/station-sales/:stationId", authMiddleware, authorize([Roles.ADMIN, Roles.MANAGER]), TransactionController.getSalesByStation);

export default router;
