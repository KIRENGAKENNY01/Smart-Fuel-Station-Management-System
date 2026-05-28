import * as FuelService from '../services/fuel.service.js';
import prisma from '../lib/prisma.js';
import { response, resolveFuelTypeLabel } from '@smart-fuel/shared';

export const getStationInventory = async (req, res) => {
  try {
    const inventory = await FuelService.getInventoryByStation(req.params.stationId);
    response(res, 200, 'Inventory retrieved', inventory);
  } catch (err) {
    response(res, 500, err.message);
  }
};

export const addSupply = async (req, res) => {
  try {
    const supply = await FuelService.logSupply(req.body);
    response(res, 201, 'Supply logged and inventory updated', supply);
  } catch (err) {
    response(res, 400, err.message);
  }
};

export const getFuelTypes = async (req, res) => {
  try {
    const types = await FuelService.getAllFuelTypes();
    // Normalize to { id, name } shape for consumers
    const normalized = types.map((t) => ({ id: t.id, name: t.name, fuelTypes: t.name }));
    response(res, 200, 'Fuel types retrieved', normalized);
  } catch (err) {
    response(res, 500, err.message);
  }
};

export const getAllPrices = async (req, res) => {
  try {
    const prices = await FuelService.getPrices();
    // Normalize for consumers that expect station_id / fuel_type_id flat fields
    const normalized = prices.map((p) => ({
      station_id: p.station_id,
      fuel_type_id: p.fuel_type_id,
      price_per_liter: p.price_per_liter,
      available_liters: p.available_liters,
    }));
    response(res, 200, 'Real-time prices retrieved', normalized);
  } catch (err) {
    response(res, 500, err.message);
  }
};

export const getStationPrices = async (req, res) => {
  try {
    const rawPrices = await FuelService.getPricesByStation(req.params.stationId);
    const prices = rawPrices.map((p) => ({
      fuelTypeId: p.fuel_type_id,
      fuelType: resolveFuelTypeLabel(p.fuel_type?.name || p.fuel_type_id),
      pricePerLiter: p.price_per_liter,
      availableLiters: p.available_liters,
      lastUpdated: p.updated_at || null,
    }));
    response(res, 200, 'Station prices retrieved', prices);
  } catch (err) {
    response(res, 500, err.message);
  }
};

export const updateInventory = async (req, res) => {
  try {
    const { station_id, fuel_type_id, amount, operation } = req.body;
    const inventory = await FuelService.updateStock(station_id, fuel_type_id, amount, operation);
    response(res, 200, 'Inventory updated', inventory);
  } catch (err) {
    response(res, 400, err.message);
  }
};

export const changePrice = async (req, res) => {
  try {
    const { station_id, fuel_type_id, price } = req.body;
    const inventory = await FuelService.updatePrice(station_id, fuel_type_id, price);
    response(res, 200, 'Price updated successfully', inventory);
  } catch (err) {
    response(res, 400, err.message);
  }
};

export const setStockLevel = async (req, res) => {
  try {
    const { station_id, fuel_type_id, liters } = req.body;
    const inventory = await FuelService.setStockLevel(station_id, fuel_type_id, liters);
    response(res, 200, 'Fuel level updated', inventory);
  } catch (err) {
    response(res, 400, err.message);
  }
};

export const getPriceTrend = async (req, res) => {
  try {
    const { fuelType, range } = req.query;
    if (!fuelType) return response(res, 400, 'fuelType query parameter is required');
    const trend = await FuelService.calculatePriceTrend(req.params.stationId, fuelType, range);
    response(res, 200, 'Price trend retrieved', trend);
  } catch (err) {
    response(res, 500, err.message);
  }
};
