import express from "express";
import * as FuelController from "../controllers/fuel.controller.js";
import {
  authMiddleware,
  authorize,
  Roles,
  validateBody,
  validateQuery,
  validateParams,
  stationIdParam,
  fuelSupplySchema,
  fuelPriceSchema,
  fuelInventoryLevelSchema,
  stockUpdateSchema,
  priceTrendQuerySchema,
} from "@smart-fuel/shared";

const router = express.Router();

router.get("/internal/prices", FuelController.getAllPrices);
router.get("/internal/types", FuelController.getFuelTypes);

router.get("/types", authMiddleware, FuelController.getFuelTypes);
router.get("/prices", authMiddleware, FuelController.getAllPrices);
router.get("/prices/:stationId", authMiddleware, validateParams(stationIdParam), FuelController.getStationPrices);
router.get(
  "/price-trend/:stationId",
  authMiddleware,
  validateParams(stationIdParam),
  validateQuery(priceTrendQuerySchema),
  FuelController.getPriceTrend
);

router.get(
  "/inventory/:stationId",
  authMiddleware,
  authorize([Roles.ADMIN, Roles.MANAGER]),
  validateParams(stationIdParam),
  FuelController.getStationInventory
);

router.post(
  "/supply",
  authMiddleware,
  authorize([Roles.ADMIN, Roles.MANAGER]),
  validateBody(fuelSupplySchema),
  FuelController.addSupply
);
router.put("/price", authMiddleware, authorize([Roles.ADMIN, Roles.MANAGER]), validateBody(fuelPriceSchema), FuelController.changePrice);
router.put(
  "/inventory-level",
  authMiddleware,
  authorize([Roles.ADMIN, Roles.MANAGER]),
  validateBody(fuelInventoryLevelSchema),
  FuelController.setStockLevel
);

router.put("/stock-update", validateBody(stockUpdateSchema), FuelController.updateInventory);

export default router;
