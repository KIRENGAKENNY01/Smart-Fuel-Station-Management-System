import express from "express";
import * as ReportController from "../controllers/report.controller.js";
import { authMiddleware, authorize, Roles } from "@smart-fuel/shared";

const router = express.Router();

router.get("/driver", authMiddleware, ReportController.downloadDriverReport);
router.get("/admin", authMiddleware, authorize([Roles.ADMIN]), ReportController.downloadAdminReport);

export default router;
