import express from "express";
import * as TransactionController from "../controllers/transaction.controller.js";
import { authMiddleware, authorize, Roles } from "@smart-fuel/shared";

const router = express.Router();

// User History & Payments
router.post("/", authMiddleware, TransactionController.createTransaction);
router.get("/history", authMiddleware, TransactionController.getMyHistory);
router.get("/analytics", authMiddleware, TransactionController.getAnalytics);

// Admin
router.get("/admin/stats", authMiddleware, authorize([Roles.ADMIN]), TransactionController.getAdminDashboard);
router.get("/admin/all", authMiddleware, authorize([Roles.ADMIN]), TransactionController.getAllTransactions);

// Manager
router.get("/manager/stats", authMiddleware, authorize([Roles.MANAGER, Roles.ADMIN]), TransactionController.getManagerDashboard);
router.post("/:id/confirm", authMiddleware, authorize([Roles.MANAGER, Roles.ADMIN]), TransactionController.confirmTransaction);

// Station Sales
router.get("/station-sales/:stationId", authMiddleware, authorize([Roles.ADMIN, Roles.MANAGER]), TransactionController.getSalesByStation);

// Receipts
router.get("/:id/receipt", authMiddleware, TransactionController.getReceipt);
router.get("/:id/receipt/download", authMiddleware, TransactionController.downloadReceipt);
router.post("/:id/receipt/email", authMiddleware, TransactionController.emailReceipt);

export default router;
