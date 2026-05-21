import express from "express";
import * as UserController from "../controllers/user.controller.js";
import { authMiddleware, authorize, Roles } from "@smart-fuel/shared";

const router = express.Router();

router.get("/me", authMiddleware, UserController.getProfile);
router.put("/me", authMiddleware, UserController.updateProfile);
router.put("/me/password", authMiddleware, UserController.changePassword);

router.get("/pending/managers", authMiddleware, authorize([Roles.ADMIN]), UserController.listPendingManagers);
router.get("/", authMiddleware, authorize([Roles.ADMIN]), UserController.listUsers);
router.post("/", authMiddleware, authorize([Roles.ADMIN]), UserController.createUser);
router.patch("/:id/approve", authMiddleware, authorize([Roles.ADMIN]), UserController.approveManager);
router.patch("/:id/reject", authMiddleware, authorize([Roles.ADMIN]), UserController.rejectManager);
router.patch("/:id/suspend", authMiddleware, authorize([Roles.ADMIN]), UserController.suspend);
router.put("/:id", authMiddleware, authorize([Roles.ADMIN]), UserController.updateUser);
router.delete("/:id", authMiddleware, authorize([Roles.ADMIN]), UserController.deleteUser);

router.get("/internal/admins", UserController.listAdmins);
router.get("/internal/:id", UserController.getUserInternal);
router.put("/internal/:id/station", UserController.setStationInternal);

export default router;
