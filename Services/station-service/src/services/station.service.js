import prisma from '../lib/prisma.js';
import { resolveFuelTypeLabel } from '@smart-fuel/shared';

export const createStation = async (data) => {
  return prisma.station.create({
    data: {
      name: data.name,
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude),
      manager_id: data.manager_id || null,
      status: data.status || 'ACTIVE',
    },
  });
};

export const getAllStations = async () => {
  return prisma.station.findMany({ orderBy: { created_at: 'desc' } });
};

export const findNearbyStations = async (longitude, latitude, maxDistance = 5000) => {
  // Haversine distance filter in JS (no PostGIS required)
  const allStations = await prisma.station.findMany();

  const toRad = (deg) => (deg * Math.PI) / 180;
  const haversine = (lat1, lon1, lat2, lon2) => {
    const R = 6371000;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const nearby = allStations
    .map((st) => ({ ...st, distance: haversine(latitude, longitude, st.latitude, st.longitude) }))
    .filter((st) => st.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance);

  let fuelPrices = [];
  try {
    const res = await fetch('http://localhost:5003/api/fuel/internal/prices');
    if (res.ok) {
      const data = await res.json();
      fuelPrices = data.data || [];
    }
  } catch (err) {
    console.error('Failed to fetch fuel prices:', err.message);
  }

  return nearby.map((st) => {
    const stationFuels = fuelPrices.filter(
      (f) => String(f.station_id) === String(st.id)
    );
    return {
      stationId: st.id,
      name: st.name,
      activeStatus: st.status || 'ACTIVE',
      latitude: st.latitude,
      longitude: st.longitude,
      distance: parseFloat((st.distance / 1000).toFixed(2)), // km
      fuelTypes: stationFuels.map((f) => resolveFuelTypeLabel(f.fuel_type_id)).filter(Boolean),
      fuels: stationFuels.map((f) => ({
        fuelTypeId: f.fuel_type_id,
        fuelType: resolveFuelTypeLabel(f.fuel_type_id) || 'Unknown',
        pricePerLiter: f.price_per_liter,
        availableLiters: f.available_liters,
      })),
    };
  });
};

export const getStationById = async (id) => {
  const station = await prisma.station.findUnique({ where: { id } });
  if (!station) throw new Error('Station not found');
  return station;
};

export const updateStation = async (id, data) => {
  const updates = {};
  if (data.name !== undefined) updates.name = data.name;
  if (data.latitude !== undefined) updates.latitude = parseFloat(data.latitude);
  if (data.longitude !== undefined) updates.longitude = parseFloat(data.longitude);
  if (data.status !== undefined) updates.status = data.status;
  if (data.manager_id !== undefined) updates.manager_id = data.manager_id || null;

  const station = await prisma.station.update({ where: { id }, data: updates });
  if (!station) throw new Error('Station not found');
  return station;
};

export const deleteStation = async (id) => {
  await prisma.station.delete({ where: { id } });
  return { message: 'Station deleted successfully' };
};

export const assignManager = async (stationId, managerId) => {
  const station = await prisma.station.update({
    where: { id: stationId },
    data: { manager_id: managerId },
  });
  if (!station) throw new Error('Station not found');
  return station;
};
