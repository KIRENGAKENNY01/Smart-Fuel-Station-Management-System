import express from "express";
import * as FuelController from "../controllers/fuel.controller.js";
import { authMiddleware, authorize, Roles } from "@smart-fuel/shared";

const router = express.Router();

// Public: View real-time prices
router.get("/types", FuelController.getFuelTypes);
router.get("/prices", FuelController.getAllPrices);
router.get("/prices/:stationId", FuelController.getStationPrices);
router.get("/price-trend/:stationId", FuelController.getPriceTrend);

// Private: Check inventory at my station
router.get("/inventory/:stationId", authMiddleware, authorize([Roles.ADMIN, Roles.MANAGER]), FuelController.getStationInventory);

// Private: Log a new supply delivery
router.post("/supply", authMiddleware, authorize([Roles.ADMIN, Roles.MANAGER]), FuelController.addSupply);

// Admin/Manager: Update fuel prices
router.put("/price", authMiddleware, authorize([Roles.ADMIN, Roles.MANAGER]), FuelController.changePrice);
router.put("/inventory-level", authMiddleware, authorize([Roles.ADMIN, Roles.MANAGER]), FuelController.setStockLevel);

// Internal: Update stock (usually called by Transaction Service)
router.put("/stock-update", FuelController.updateInventory);

export default router;
