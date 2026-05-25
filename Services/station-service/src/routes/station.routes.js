import express from "express";
import * as StationController from "../controllers/station.controller.js";
import {
  authMiddleware,
  authorize,
  Roles,
  validateBody,
  validateQuery,
  validateParams,
  mongoIdParam,
  nearbyQuerySchema,
  createStationSchema,
  updateStationSchema,
  assignManagerSchema,
} from "@smart-fuel/shared";

const router = express.Router();

router.get("/signup-options", StationController.getSignupOptions);

router.get("/nearby", authMiddleware, validateQuery(nearbyQuerySchema), StationController.getNearBy);
router.get("/", authMiddleware, StationController.getAll);
router.get("/internal/:id", validateParams(mongoIdParam), StationController.getById);
router.get("/:id", authMiddleware, validateParams(mongoIdParam), StationController.getById);

router.post("/", authMiddleware, authorize([Roles.ADMIN]), validateBody(createStationSchema), StationController.createStation);
router.put("/:id", authMiddleware, authorize([Roles.ADMIN]), validateParams(mongoIdParam), validateBody(updateStationSchema), StationController.update);
router.delete("/:id", authMiddleware, authorize([Roles.ADMIN]), validateParams(mongoIdParam), StationController.remove);
router.patch("/:id/assign-manager", authMiddleware, authorize([Roles.ADMIN]), validateParams(mongoIdParam), validateBody(assignManagerSchema), StationController.assignManager);
router.patch("/internal/:id/assign-manager", validateParams(mongoIdParam), validateBody(assignManagerSchema), StationController.assignManager);

export default router;
