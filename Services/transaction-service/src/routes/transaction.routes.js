import express from "express";
import * as TransactionController from "../controllers/transaction.controller.js";
import {
  authMiddleware,
  authorize,
  Roles,
  validateBody,
  validateQuery,
  validateParams,
  mongoIdParam,
  stationIdParam,
  createTransactionSchema,
  historyQuerySchema,
  emailReceiptSchema,
  adminStatsQuerySchema,
  managerStatsQuerySchema,
  stationSalesQuerySchema,
} from "@smart-fuel/shared";

const router = express.Router();

router.post("/", authMiddleware, validateBody(createTransactionSchema), TransactionController.createTransaction);
router.get("/history", authMiddleware, validateQuery(historyQuerySchema), TransactionController.getMyHistory);
router.get("/analytics", authMiddleware, TransactionController.getAnalytics);

router.get(
  "/admin/stats",
  authMiddleware,
  authorize([Roles.ADMIN]),
  validateQuery(adminStatsQuerySchema),
  TransactionController.getAdminDashboard
);
router.get(
  "/admin/all",
  authMiddleware,
  authorize([Roles.ADMIN]),
  validateQuery(historyQuerySchema),
  TransactionController.getAllTransactions
);

router.get(
  "/manager/stats",
  authMiddleware,
  authorize([Roles.MANAGER, Roles.ADMIN]),
  validateQuery(managerStatsQuerySchema),
  TransactionController.getManagerDashboard
);
router.post(
  "/:id/confirm",
  authMiddleware,
  authorize([Roles.MANAGER, Roles.ADMIN]),
  validateParams(mongoIdParam),
  TransactionController.confirmTransaction
);

router.get(
  "/station-sales/:stationId",
  authMiddleware,
  authorize([Roles.ADMIN, Roles.MANAGER]),
  validateParams(stationIdParam),
  validateQuery(stationSalesQuerySchema),
  TransactionController.getSalesByStation
);

router.get("/:id/receipt", authMiddleware, validateParams(mongoIdParam), TransactionController.getReceipt);
router.get("/:id/receipt/download", authMiddleware, validateParams(mongoIdParam), TransactionController.downloadReceipt);
router.post(
  "/:id/receipt/email",
  authMiddleware,
  validateParams(mongoIdParam),
  validateBody(emailReceiptSchema),
  TransactionController.emailReceipt
);

export default router;
