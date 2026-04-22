import FuelInventory from "../models/fuelInventory.js";
import FuelType from "../models/fuel.model.js";
import Supply from "../models/supply.model.js";

// Inventory Management
export const getInventoryByStation = async (stationId) => {
  return await FuelInventory.find({ station_id: stationId }).populate('fuel_type_id');
};

export const updateStock = async (stationId, fuelTypeId, amount, operation = 'add') => {
  const inventory = await FuelInventory.findOne({ station_id: stationId, fuel_type_id: fuelTypeId });
  if (!inventory) throw new Error("Inventory record not found for this station/fuel combination");

  if (operation === 'add') {
    inventory.available_liters += amount;
  } else {
    if (inventory.available_liters < amount) throw new Error("Insufficient stock");
    inventory.available_liters -= amount;
  }

  inventory.updated_at = Date.now();
  return await inventory.save();
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
export const getPrices = async () => {
    return await FuelInventory.find().select('station_id fuel_type_id price_per_liter available_liters');
};
