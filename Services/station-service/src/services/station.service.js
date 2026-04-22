import Station from "../models/station.model.js";

export const createStation = async (data) => {
  return await Station.create(data);
};

export const getAllStations = async (filters = {}) => {
  return await Station.find(filters);
};

// FEATURE: Find Nearby Stations (within a certain radius in meters)
export const findNearbyStations = async (longitude, latitude, maxDistance = 5000) => {
  return await Station.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        $maxDistance: maxDistance,
      },
    },
  });
};

export const getStationById = async (id) => {
  const station = await Station.findById(id);
  if (!station) throw new Error("Station not found");
  return station;
};

export const updateStation = async (id, data) => {
  const station = await Station.findByIdAndUpdate(id, data, { new: true });
  if (!station) throw new Error("Station not found");
  return station;
};

export const deleteStation = async (id) => {
  const station = await Station.findByIdAndDelete(id);
  if (!station) throw new Error("Station not found");
  return { message: "Station deleted successfully" };
};
