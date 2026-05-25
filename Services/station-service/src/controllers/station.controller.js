import * as StationService from "../services/station.service.js";
import { response } from "@smart-fuel/shared";

export const createStation = async (req, res) => {
  try {
    const station = await StationService.createStation(req.body);
    response(res, 201, "Station created successfully", station);
  } catch (err) {
    response(res, 400, err.message);
  }
};

export const getSignupOptions = async (req, res) => {
  try {
    const stations = await StationService.getAllStations();
    const options = stations.map((s) => {
      const doc = s.toJSON ? s.toJSON() : s;
      return { _id: doc._id, name: doc.name };
    });
    response(res, 200, "Stations available for manager registration", options);
  } catch (err) {
    response(res, 500, err.message);
  }
};

export const getNearBy = async (req, res) => {
  try {
    const { lat, lon, distance } = req.query;
    if (!lat || !lon) return response(res, 400, "Latitude and Longitude are required");

    const stations = await StationService.findNearbyStations(
      parseFloat(lon),
      parseFloat(lat),
      distance ? parseInt(distance) : 5000
    );
    response(res, 200, `${stations.length} stations found nearby`, stations);
  } catch (err) {
    response(res, 500, err.message);
  }
};

export const getAll = async (req, res) => {
  try {
    const stations = await StationService.getAllStations(req.query);
    response(res, 200, "Stations retrieved successfully", stations);
  } catch (err) {
    response(res, 500, err.message);
  }
};

export const getById = async (req, res) => {
  try {
    const station = await StationService.getStationById(req.params.id);
    response(res, 200, "Station retrieved", station);
  } catch (err) {
    response(res, 404, err.message);
  }
};

export const update = async (req, res) => {
  try {
    const station = await StationService.updateStation(req.params.id, req.body);
    response(res, 200, "Station updated", station);
  } catch (err) {
    response(res, 400, err.message);
  }
};

export const remove = async (req, res) => {
  try {
    const result = await StationService.deleteStation(req.params.id);
    response(res, 200, result.message);
  } catch (err) {
    response(res, 404, err.message);
  }
};

export const assignManager = async (req, res) => {
  try {
    const { managerId } = req.body;
    if (!managerId) return response(res, 400, "managerId is required");
    const station = await StationService.assignManager(req.params.id, managerId);
    try {
      const axios = (await import("axios")).default;
      await axios.put(`http://localhost:5001/api/auth/users/internal/${managerId}/station`, {
        station_id: req.params.id,
      });
    } catch (e) {
      console.error("Failed to sync manager station_id:", e.message);
    }
    response(res, 200, "Manager assigned to station", station);
  } catch (err) {
    response(res, 400, err.message);
  }
};
