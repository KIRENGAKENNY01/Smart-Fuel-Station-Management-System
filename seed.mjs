import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

// --- Configuration ---
const MONGO_URI_BASE = "mongodb://localhost:27017";
const DB_AUTH = `${MONGO_URI_BASE}/smart_fuel_auth`;
const DB_STATION = `${MONGO_URI_BASE}/smart_fuel_stations`;
const DB_FUEL = `${MONGO_URI_BASE}/smart_fuel_inventory`;

const seed = async () => {
  try {
    console.log("🚀 Starting System Seed...");

    // 1. SEED AUTH SERVICE (Users)
    const authConn = await mongoose.createConnection(DB_AUTH).asPromise();
    const UserSchema = new mongoose.Schema({ full_name: String, email: String, password: String, role: String });
    const User = authConn.model('User', UserSchema);

    await User.deleteMany({});
    const hashed = await bcrypt.hash("Pass123!", 10);
    
    const admin = await User.create({ full_name: "System Admin", email: "admin@fuel.com", password: hashed, role: "ADMIN" });
    const manager = await User.create({ full_name: "Kigali Manager", email: "manager@fuel.com", password: hashed, role: "MANAGER" });
    const driver = await User.create({ full_name: "John Driver", email: "driver@fuel.com", password: hashed, role: "DRIVER" });
    
    console.log("✅ Users Created (Password: Pass123!)");

    // 2. SEED STATION SERVICE
    const stationConn = await mongoose.createConnection(DB_STATION).asPromise();
    const StationSchema = new mongoose.Schema({ name: String, location: { type: { type: String }, coordinates: [Number] }, manager_id: mongoose.Schema.Types.ObjectId });
    const Station = stationConn.model('Station', StationSchema);

    await Station.deleteMany({});
    const station = await Station.create({
      name: "Nyabugogo Station",
      location: { type: "Point", coordinates: [30.05, -1.93] },
      manager_id: manager._id
    });
    console.log("✅ Nyabugogo Station Created");

    // 3. SEED FUEL SERVICE (Types & Inventory)
    const fuelConn = await mongoose.createConnection(DB_FUEL).asPromise();
    const FuelTypeSchema = new mongoose.Schema({ name: String, code: String });
    const FuelInventorySchema = new mongoose.Schema({ station_id: mongoose.Schema.Types.ObjectId, fuel_type_id: mongoose.Schema.Types.ObjectId, available_liters: Number, price_per_liter: Number });
    
    const FuelType = fuelConn.model('FuelType', FuelTypeSchema);
    const FuelInventory = fuelConn.model('FuelInventory', FuelInventorySchema);

    await FuelType.deleteMany({});
    await FuelInventory.deleteMany({});

    const petrol = await FuelType.create({ name: "Petrol", code: "P95" });
    const diesel = await FuelType.create({ name: "Diesel", code: "D10" });

    await FuelInventory.create([
      { station_id: station._id, fuel_type_id: petrol._id, available_liters: 5000, price_per_liter: 1540 },
      { station_id: station._id, fuel_type_id: diesel._id, available_liters: 8000, price_per_liter: 1500 }
    ]);

    console.log("✅ Fuel Types and Inventory Initialized");
    console.log("\n🔥 SYSTEM SEEDED SUCCESSFULLY!");
    console.log("------------------------------");
    console.log(`Station ID: ${station._id}`);
    console.log(`Petrol ID: ${petrol._id}`);
    console.log(`Diesel ID: ${diesel._id}`);
    console.log("------------------------------");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

seed();
