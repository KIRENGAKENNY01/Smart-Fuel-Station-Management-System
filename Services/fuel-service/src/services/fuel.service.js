import prisma from '../lib/prisma.js';
import axios from 'axios';

const NOTIFICATION_SERVICE = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:5006';
const AUTH_SERVICE = process.env.AUTH_SERVICE_URL || 'http://localhost:5001';
const STATION_SERVICE = process.env.STATION_SERVICE_URL || 'http://localhost:5002';
const DEFAULT_FUEL_TYPES = ['PETROL', 'DIESEL'];

export const ensureDefaultFuelTypes = async () => {
  const fuelTypes = [];

  for (const name of DEFAULT_FUEL_TYPES) {
    let fuelType = await prisma.fuelType.findFirst({ where: { name } });
    if (!fuelType) {
      fuelType = await prisma.fuelType.create({ data: { name } });
    }
    fuelTypes.push(fuelType);
  }

  return fuelTypes;
};

const sendAlert = async (userId, type, message) => {
  try {
    await axios.post(`${NOTIFICATION_SERVICE}/api/notifications/internal`, { user_id: userId, type, message });
  } catch (err) {
    console.error('Alert failed:', err.message);
  }
};

const checkStockAlerts = async (inventory, previousLiters = null) => {
  if (!inventory) return;
  const threshold = inventory.low_stock_threshold ?? 500;

  if (inventory.available_liters < threshold) {
    try {
      const stationRes = await axios.get(`${STATION_SERVICE}/api/stations/internal/${inventory.station_id}`);
      const managerId = stationRes.data?.data?.manager_id;
      const msg = `Low stock at station: ${inventory.available_liters}L remaining`;
      if (managerId) await sendAlert(managerId, 'LOW_STOCK', msg);
      const adminsRes = await axios.get(`${AUTH_SERVICE}/api/auth/users/internal/admins`);
      const admins = adminsRes.data?.data || [];
      await Promise.all(admins.map((a) => sendAlert(a.id, 'LOW_FUEL', msg)));
    } catch (err) {
      console.error('Stock alert error:', err.message);
    }
  }

  if (previousLiters != null) {
    const drop = previousLiters - inventory.available_liters;
    if (drop > 1000) {
      try {
        const stationRes = await axios.get(`${STATION_SERVICE}/api/stations/internal/${inventory.station_id}`);
        const managerId = stationRes.data?.data?.manager_id;
        if (managerId) await sendAlert(managerId, 'INVENTORY_DROP', `Sudden inventory drop: -${drop}L`);
      } catch (_) {}
    }
    if (drop > 2000) {
      try {
        const stationRes = await axios.get(`${STATION_SERVICE}/api/stations/internal/${inventory.station_id}`);
        const managerId = stationRes.data?.data?.manager_id;
        if (managerId) await sendAlert(managerId, 'ABNORMAL_CONSUMPTION', `Abnormal fuel consumption detected: -${drop}L`);
      } catch (_) {}
    }
  }
};

export const getInventoryByStation = async (stationId) => {
  return prisma.fuelInventory.findMany({
    where: { station_id: stationId },
    include: { fuel_type: true },
  });
};

export const updateStock = async (stationId, fuelTypeId, amount, operation = 'add') => {
  const current = await prisma.fuelInventory.findUnique({
    where: { station_id_fuel_type_id: { station_id: stationId, fuel_type_id: fuelTypeId } },
  });
  if (!current) throw new Error('Inventory record not found');

  if (operation !== 'add') {
    if (current.available_liters < amount) throw new Error('Insufficient stock');
  }

  const previousLiters = current.available_liters;
  const newLiters = operation === 'add'
    ? current.available_liters + amount
    : current.available_liters - amount;

  const inventory = await prisma.fuelInventory.update({
    where: { station_id_fuel_type_id: { station_id: stationId, fuel_type_id: fuelTypeId } },
    data: { available_liters: newLiters },
  });

  await checkStockAlerts(inventory, operation !== 'add' ? previousLiters : null);
  return inventory;
};

export const setStockLevel = async (stationId, fuelTypeId, liters) => {
  const current = await prisma.fuelInventory.findUnique({
    where: { station_id_fuel_type_id: { station_id: stationId, fuel_type_id: fuelTypeId } },
  });
  const previousLiters = current?.available_liters ?? 0;

  const inventory = await prisma.fuelInventory.upsert({
    where: { station_id_fuel_type_id: { station_id: stationId, fuel_type_id: fuelTypeId } },
    create: {
      station_id: stationId,
      fuel_type_id: fuelTypeId,
      available_liters: liters,
      price_per_liter: 0,
    },
    update: { available_liters: liters },
  });
  await checkStockAlerts(inventory, previousLiters);
  return inventory;
};

export const logSupply = async (data) => {
  const inventory = await prisma.fuelInventory.upsert({
    where: {
      station_id_fuel_type_id: {
        station_id: data.station_id,
        fuel_type_id: data.fuel_type_id,
      },
    },
    create: {
      station_id: data.station_id,
      fuel_type_id: data.fuel_type_id,
      available_liters: 0,
      price_per_liter: data.price_per_liter || 0,
    },
    update: {},
  });

  const supply = await prisma.supply.create({
    data: {
      station_id: data.station_id,
      fuel_type_id: data.fuel_type_id,
      liters_added: data.liters_added,
      cost_price: data.cost_price || null,
    },
  });
  await updateStock(inventory.station_id, inventory.fuel_type_id, data.liters_added, 'add');
  return supply;
};

export const getAllFuelTypes = async () => {
  await ensureDefaultFuelTypes();
  return prisma.fuelType.findMany({
    orderBy: { name: 'asc' },
  });
};

export const getPrices = async () => {
  return prisma.fuelInventory.findMany({
    select: {
      station_id: true,
      fuel_type_id: true,
      price_per_liter: true,
      available_liters: true,
      fuel_type: true,
    },
  });
};

export const getPricesByStation = async (stationId) => {
  return prisma.fuelInventory.findMany({
    where: { station_id: stationId },
    select: {
      station_id: true,
      fuel_type_id: true,
      price_per_liter: true,
      available_liters: true,
      fuel_type: true,
    },
  });
};

export const updatePrice = async (stationId, fuelTypeId, newPrice) => {
  const inventory = await prisma.fuelInventory.upsert({
    where: { station_id_fuel_type_id: { station_id: stationId, fuel_type_id: fuelTypeId } },
    create: {
      station_id: stationId,
      fuel_type_id: fuelTypeId,
      available_liters: 0,
      price_per_liter: newPrice,
    },
    update: { price_per_liter: newPrice },
  });
  return inventory;
};

export const calculatePriceTrend = async (stationId, fuelTypeId, range = '7d') => {
  const inventory = await prisma.fuelInventory.findUnique({
    where: { station_id_fuel_type_id: { station_id: stationId, fuel_type_id: fuelTypeId } },
  });
  if (!inventory) throw new Error('Fuel inventory not found for this station to generate trend');

  const currentPrice = inventory.price_per_liter;
  const days = range === '30d' ? 30 : 7;
  const trend = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const variation = i === 0 ? 0 : Math.floor(Math.random() * 40) - 20;
    trend.push({ date: date.toISOString().split('T')[0], price: currentPrice + variation });
  }
  return trend;
};
