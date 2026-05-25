import mongoose from 'mongoose';
import dotenv from 'dotenv';
import FuelInventory from '../Services/fuel-service/src/models/fuelInventory.js';
import FuelType from '../Services/fuel-service/src/models/fuel.model.js';

dotenv.config();

const MONGO_URI = 'mongodb://localhost:27017/smart_fuel_inventory';

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB!");
    
    const types = await FuelType.find();
    console.log("FuelTypes in DB:", JSON.stringify(types, null, 2));

    const inventory = await FuelInventory.find().populate('fuel_type_id');
    console.log("Inventory with populated fuel_type_id:", JSON.stringify(inventory, null, 2));

    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

run();
