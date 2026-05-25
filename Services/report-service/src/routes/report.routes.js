import express from "express";
import * as ReportController from "../controllers/report.controller.js";
import {
  authMiddleware,
  authorize,
  Roles,
  validateQuery,
  driverReportQuerySchema,
  adminReportQuerySchema,
} from "@smart-fuel/shared";

const router = express.Router();

router.get(
  "/driver",
  authMiddleware,
  validateQuery(driverReportQuerySchema),
  ReportController.downloadDriverReport
);
router.get(
  "/admin",
  authMiddleware,
  authorize([Roles.ADMIN]),
  validateQuery(adminReportQuerySchema),
  ReportController.downloadAdminReport
);

export default router;
