import Transaction from "../models/transaction.model.js";
import axios from "axios";

export const processPayment = async (data) => {
  // 1. Fetch current price from fuel-service
  const pricesRes = await axios.get(`http://localhost:5003/api/fuel/prices`);
  const prices = pricesRes.data.data || pricesRes.data; // Handle the response format safely

  // Find the exact fuel inventory for this station and fuel type
  const fuelInfo = prices.find(p => 
    String(p.station_id) === String(data.station_id) && 
    String(p.fuel_type_id) === String(data.fuel_type_id)
  );

  if (!fuelInfo) {
    throw new Error("Fuel inventory not found for this station and fuel type");
  }

  // Calculate the total amount based on requested liters and real-time price
  const amount = data.liters * fuelInfo.price_per_liter;

  // In a real system, you'd call a Mobile Money / Card API here.
  // We will assume the payment was successful.

  // 2. Create the transaction record
  const transaction = await Transaction.create({
    ...data,
    amount,
    status: 'COMPLETED'
  });

  // 3. Update Fuel Inventory (Calling Fuel Service)
  // This is a direct Service-to-Service call.
  try {
    await axios.put(`http://localhost:5003/api/fuel/stock-update`, {
        station_id: data.station_id,
        fuel_type_id: data.fuel_type_id,
        amount: data.liters,
        operation: 'subtract'
    });
  } catch (err) {
    console.error("Failed to update inventory, but payment was taken!", err.message);
    // In a real system, you'd use a补偿 transaction or Event Bus here.
  }

  return transaction;
};

export const getHistory = async (userId) => {
  return await Transaction.find({ driver_id: userId }).sort({ created_at: -1 });
};

export const getStationSales = async (stationId) => {
  return await Transaction.find({ station_id: stationId, status: 'COMPLETED' });
};
