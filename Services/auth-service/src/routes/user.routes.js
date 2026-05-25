import express from "express";
import * as UserController from "../controllers/user.controller.js";
import {
  authMiddleware,
  authorize,
  Roles,
  validateBody,
  validateParams,
  mongoIdParam,
  updateProfileSchema,
  changePasswordSchema,
  adminCreateUserSchema,
  adminUpdateUserSchema,
  approveManagerSchema,
  rejectManagerSchema,
  internalSetStationSchema,
} from "@smart-fuel/shared";

const router = express.Router();

router.get("/me", authMiddleware, UserController.getProfile);
router.put("/me", authMiddleware, validateBody(updateProfileSchema), UserController.updateProfile);
router.put("/me/password", authMiddleware, validateBody(changePasswordSchema), UserController.changePassword);

router.get("/pending/managers", authMiddleware, authorize([Roles.ADMIN]), UserController.listPendingManagers);
router.get("/", authMiddleware, authorize([Roles.ADMIN]), UserController.listUsers);
router.post("/", authMiddleware, authorize([Roles.ADMIN]), validateBody(adminCreateUserSchema), UserController.createUser);
router.patch("/:id/approve", authMiddleware, authorize([Roles.ADMIN]), validateParams(mongoIdParam), validateBody(approveManagerSchema), UserController.approveManager);
router.patch("/:id/reject", authMiddleware, authorize([Roles.ADMIN]), validateParams(mongoIdParam), validateBody(rejectManagerSchema), UserController.rejectManager);
router.patch("/:id/suspend", authMiddleware, authorize([Roles.ADMIN]), validateParams(mongoIdParam), UserController.suspend);
router.patch("/:id/unsuspend", authMiddleware, authorize([Roles.ADMIN]), validateParams(mongoIdParam), UserController.unsuspend);
router.put("/:id", authMiddleware, authorize([Roles.ADMIN]), validateParams(mongoIdParam), validateBody(adminUpdateUserSchema), UserController.updateUser);
router.delete("/:id", authMiddleware, authorize([Roles.ADMIN]), validateParams(mongoIdParam), UserController.deleteUser);

router.get("/internal/admins", UserController.listAdmins);
router.get("/internal/:id", validateParams(mongoIdParam), UserController.getUserInternal);
router.put("/internal/:id/station", validateParams(mongoIdParam), validateBody(internalSetStationSchema), UserController.setStationInternal);

export default router;
