import * as FuelService from "../services/fuel.service.js";
import { response } from "@smart-fuel/shared";

export const getStationInventory = async (req, res) => {
  try {
    const inventory = await FuelService.getInventoryByStation(req.params.stationId);
    response(res, 200, "Inventory retrieved", inventory);
  } catch (err) {
    response(res, 500, err.message);
  }
};

export const addSupply = async (req, res) => {
  try {
    const supply = await FuelService.logSupply(req.body);
    response(res, 201, "Supply logged and inventory updated", supply);
  } catch (err) {
    response(res, 400, err.message);
  }
};

export const getAllPrices = async (req, res) => {
  try {
    const prices = await FuelService.getPrices();
    response(res, 200, "Real-time prices retrieved", prices);
  } catch (err) {
    response(res, 500, err.message);
  }
};

export const getStationPrices = async (req, res) => {
  try {
    const prices = await FuelService.getPricesByStation(req.params.stationId);
    response(res, 200, "Station prices retrieved", prices);
  } catch (err) {
    response(res, 500, err.message);
  }
};

export const updateInventory = async (req, res) => {
  try {
    const { station_id, fuel_type_id, amount, operation } = req.body;
    const inventory = await FuelService.updateStock(station_id, fuel_type_id, amount, operation);
    response(res, 200, "Inventory updated", inventory);
  } catch (err) {
    response(res, 400, err.message);
  }
};

export const changePrice = async (req, res) => {
  try {
    const { station_id, fuel_type_id, price } = req.body;
    const inventory = await FuelService.updatePrice(station_id, fuel_type_id, price);
    response(res, 200, "Price updated successfully", inventory);
  } catch (err) {
    response(res, 400, err.message);
  }
};
