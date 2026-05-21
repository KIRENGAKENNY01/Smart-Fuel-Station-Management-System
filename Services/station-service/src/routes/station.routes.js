import express from "express";
import * as StationController from "../controllers/station.controller.js";
import { authMiddleware, authorize, Roles } from "@smart-fuel/shared";

const router = express.Router();

// Public Routes (or just authenticated drivers)
router.get("/nearby", StationController.getNearBy);
router.get("/", StationController.getAll);
router.get("/:id", StationController.getById);

// Admin Protected Routes
router.post("/",authMiddleware, authorize([Roles.ADMIN]), StationController.createStation)
router.put("/:id", authMiddleware, authorize([Roles.ADMIN]), StationController.update);
router.delete("/:id", authMiddleware, authorize([Roles.ADMIN]), StationController.remove);
router.patch("/:id/assign-manager", authMiddleware, authorize([Roles.ADMIN]), StationController.assignManager);
router.patch("/internal/:id/assign-manager", StationController.assignManager);

export default router;
