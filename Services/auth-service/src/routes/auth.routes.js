import express from "express";
import * as AuthController from "../controllers/auth.controller.js";
import {
  validateBody,
  signupSchema,
  loginSchema,
  refreshSchema,
  logoutSchema,
} from "@smart-fuel/shared";

const router = express.Router();

router.post("/signup", validateBody(signupSchema), AuthController.signup);
router.post("/login", validateBody(loginSchema), AuthController.login);
router.post("/refresh", validateBody(refreshSchema), AuthController.refresh);
router.post("/logout", validateBody(logoutSchema), AuthController.logout);

export default router;
