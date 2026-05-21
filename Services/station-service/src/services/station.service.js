import Station from "../models/station.model.js";

export const createStation = async (data) => {
  const payload = { ...data };
  if (data.longitude != null && data.latitude != null && !data.location) {
    payload.location = {
      type: "Point",
      coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)],
    };
  }
  return await Station.create(payload);
};

export const getAllStations = async (filters = {}) => {
  return await Station.find(filters);
};

export const findNearbyStations = async (longitude, latitude, maxDistance = 5000) => {
  const stations = await Station.find({
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

  let fuelPrices = [];
  try {
    const res = await fetch("http://localhost:5003/api/fuel/prices");
    if (res.ok) {
      const data = await res.json();
      fuelPrices = data.data || [];
    }
  } catch (err) {
    console.error("Failed to fetch fuel prices from fuel-service:", err.message);
  }

  return stations.map(st => {
    const doc = st.toJSON();
    const stationFuels = fuelPrices.filter(f => String(f.station_id) === String(doc._id) || String(f.station_id?._id) === String(doc._id));
    
    return {
      stationId: doc._id,
      name: doc.name,
      location: doc.location,
      activeStatus: doc.status || "ACTIVE",
      fuelTypes: stationFuels.map(f => f.fuel_type_id?.fuelTypes || f.fuel_type_id?.name || "Fuel"),
      fuels: stationFuels.map(f => ({
        fuelType: f.fuel_type_id?.fuelTypes || f.fuel_type_id?.name || "Fuel",
        pricePerLiter: f.price_per_liter,
        availableLiters: f.available_liters
      })),
      longitude: doc.longitude,
      latitude: doc.latitude
    };
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

export const assignManager = async (stationId, managerId) => {
  const station = await Station.findByIdAndUpdate(
    stationId,
    { manager_id: managerId, updated_at: Date.now() },
    { new: true }
  );
  if (!station) throw new Error("Station not found");
  return station;
};
