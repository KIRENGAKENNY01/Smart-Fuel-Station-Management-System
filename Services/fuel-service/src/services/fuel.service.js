import FuelInventory from "../models/fuelInventory.js";
import FuelType from "../models/fuel.model.js";
import Supply from "../models/supply.model.js";
import axios from "axios";

const NOTIFICATION_SERVICE = process.env.NOTIFICATION_SERVICE_URL || "http://localhost:5006";
const AUTH_SERVICE = process.env.AUTH_SERVICE_URL || "http://localhost:5001";
const STATION_SERVICE = process.env.STATION_SERVICE_URL || "http://localhost:5002";

const sendAlert = async (userId, type, message) => {
  try {
    await axios.post(`${NOTIFICATION_SERVICE}/api/notifications/internal`, {
      user_id: userId,
      type,
      message,
    });
  } catch (err) {
    console.error("Alert failed:", err.message);
  }
};

const checkStockAlerts = async (inventory, previousLiters = null) => {
  if (!inventory) return;
  const stationId = inventory.station_id;
  const threshold = inventory.low_stock_threshold ?? 500;

  if (inventory.available_liters < threshold) {
    try {
      const stationRes = await axios.get(`${STATION_SERVICE}/api/stations/internal/${stationId}`);
      const managerId = stationRes.data?.data?.manager_id;
      const msg = `Low stock at station: ${inventory.available_liters}L remaining (${inventory.fuel_type_id})`;
      if (managerId) await sendAlert(managerId, "LOW_STOCK", msg);
      const adminsRes = await axios.get(`${AUTH_SERVICE}/api/auth/users/internal/admins`);
      const admins = adminsRes.data?.data || [];
      await Promise.all(admins.map((a) => sendAlert(a._id, "LOW_FUEL", msg)));
    } catch (err) {
      console.error("Stock alert error:", err.message);
    }
  }

  if (previousLiters != null) {
    const drop = previousLiters - inventory.available_liters;
    if (drop > 1000) {
      try {
        const stationRes = await axios.get(`${STATION_SERVICE}/api/stations/internal/${stationId}`);
        const managerId = stationRes.data?.data?.manager_id;
        const msg = `Sudden inventory drop: -${drop}L`;
        if (managerId) await sendAlert(managerId, "INVENTORY_DROP", msg);
      } catch (_) {}
    }
    if (drop > 2000) {
      try {
        const stationRes = await axios.get(`${STATION_SERVICE}/api/stations/internal/${stationId}`);
        const managerId = stationRes.data?.data?.manager_id;
        if (managerId) {
          await sendAlert(managerId, "ABNORMAL_CONSUMPTION", `Abnormal fuel consumption detected: -${drop}L`);
        }
      } catch (_) {}
    }
  }
};

// Inventory Management
export const getInventoryByStation = async (stationId) => {
  return await FuelInventory.find({ station_id: stationId }).populate('fuel_type_id');
};

export const updateStock = async (stationId, fuelTypeId, amount, operation = 'add') => {
  const incAmount = operation === 'add' ? amount : -amount;

  // If subtracting, we need to check if there is enough stock
  let previousLiters = null;
  if (operation !== 'add') {
    const current = await FuelInventory.findOne({ station_id: stationId, fuel_type_id: fuelTypeId });
    if (!current) throw new Error("Inventory record not found");
    if (current.available_liters < amount) throw new Error("Insufficient stock");
    previousLiters = current.available_liters;
  }

  const inventory = await FuelInventory.findOneAndUpdate(
    { station_id: stationId, fuel_type_id: fuelTypeId },
    { 
      $inc: { available_liters: incAmount },
      $set: { updated_at: Date.now() }
    },
    { new: true, runValidators: true }
  );

  if (!inventory) throw new Error("Inventory record not found for this station/fuel combination");
  await checkStockAlerts(inventory, previousLiters);
  return inventory;
};

export const setStockLevel = async (stationId, fuelTypeId, liters) => {
  const current = await FuelInventory.findOne({ station_id: stationId, fuel_type_id: fuelTypeId });
  if (!current) throw new Error("Inventory record not found");
  const previousLiters = current.available_liters;
  const inventory = await FuelInventory.findOneAndUpdate(
    { station_id: stationId, fuel_type_id: fuelTypeId },
    { available_liters: liters, updated_at: Date.now() },
    { new: true }
  );
  await checkStockAlerts(inventory, previousLiters);
  return inventory;
};

// Supply Chain (Detection of Anomalies)
export const logSupply = async (data) => {
  // 1. Log the supply delivery
  const supply = await Supply.create(data);

  // 2. Automatically update inventory
  await updateStock(data.station_id, data.fuel_type_id, data.liters_added, 'add');

  return supply;
};

// Public: Get all prices across stations
export const getAllFuelTypes = async () => {
  return await FuelType.find().select("_id fuelTypes");
};

export const getPrices = async () => {
    return await FuelInventory.find()
      .select('station_id fuel_type_id price_per_liter available_liters')
      .populate('fuel_type_id');
};

export const getPricesByStation = async (stationId) => {
    return await FuelInventory.find({ station_id: stationId })
      .select('station_id fuel_type_id price_per_liter available_liters')
      .populate('fuel_type_id');
};

export const updatePrice = async (stationId, fuelTypeId, newPrice) => {
  const inventory = await FuelInventory.findOneAndUpdate(
    { station_id: stationId, fuel_type_id: fuelTypeId },
    { 
      $set: { 
        price_per_liter: newPrice,
        updated_at: Date.now()
      } 
    },
    { new: true, runValidators: true }
  );

  if (!inventory) throw new Error("Inventory record not found");
  return inventory;
};

// Driver Feature: Fuel Price Trend
export const calculatePriceTrend = async (stationId, fuelType, range = '7d') => {
  // In a full implementation, query a PriceHistory collection here.
  // We use current price to generate a realistic mock trend for the required range.
  const inventory = await FuelInventory.findOne({ station_id: stationId, fuel_type_id: fuelType });
  if (!inventory) throw new Error("Fuel inventory not found for this station to generate trend");

  const currentPrice = inventory.price_per_liter;
  const days = range === '30d' ? 30 : 7;
  const trend = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Simulate a slight variation in the past, ensuring today is the current price
    const variation = i === 0 ? 0 : Math.floor(Math.random() * 40) - 20; 
    trend.push({
      date: date.toISOString().split('T')[0],
      price: currentPrice + variation
    });
  }

  return trend;
};
