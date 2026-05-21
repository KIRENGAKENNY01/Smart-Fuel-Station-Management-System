import Transaction from "../models/transaction.model.js";
import mongoose from "mongoose";
import axios from "axios";

const NOTIFICATION_SERVICE = process.env.NOTIFICATION_SERVICE_URL || "http://localhost:5006";
const STATION_SERVICE = process.env.STATION_SERVICE_URL || "http://localhost:5002";
const AUTH_SERVICE = process.env.AUTH_SERVICE_URL || "http://localhost:5001";

const notifyAdmins = async (type, message) => {
  try {
    const res = await axios.get(`${AUTH_SERVICE}/api/auth/users/internal/admins`);
    const admins = res.data?.data || [];
    await Promise.all(
      admins.map((a) => sendNotification(a._id, type, message))
    );
  } catch (err) {
    console.error("Failed to notify admins:", err.message);
  }
};

const sendNotification = async (userId, type, message, transactionId = null) => {
  try {
    await axios.post(`${NOTIFICATION_SERVICE}/api/notifications/internal`, {
      user_id: userId,
      type,
      message,
      transaction_id: transactionId,
    });
  } catch (err) {
    console.error("Failed to send notification:", err.message);
  }
};

export const formatReceipt = (txn) => ({
  receiptId: txn._id,
  transactionId: txn._id,
  stationId: txn.station_id,
  fuelTypeId: txn.fuel_type_id,
  liters: txn.liters,
  totalAmount: txn.amount,
  pricePerLiter: txn.liters > 0 ? Math.round(txn.amount / txn.liters) : 0,
  status: txn.status,
  issuedAt: txn.created_at,
  company: "XYZ.ltd",
});

export const processPayment = async (data) => {
  // 1. Fetch current price from fuel-service
  const pricesRes = await axios.get(`http://localhost:5003/api/fuel/prices`);
  const prices = pricesRes.data.data || pricesRes.data; // Handle the response format safely

  // Find the exact fuel inventory for this station and fuel type
  const fuelInfo = prices.find(
    (p) =>
      String(p.station_id?._id || p.station_id) === String(data.station_id) &&
      String(p.fuel_type_id?._id || p.fuel_type_id) === String(data.fuel_type_id)
  );

  if (!fuelInfo) {
    throw new Error("Fuel inventory not found for this station and fuel type");
  }

  // Calculate the total amount based on requested liters and real-time price
  const amount = data.liters * fuelInfo.price_per_liter;

  // In a real system, you'd call a Mobile Money / Card API here.
  // We will assume the payment was successful.

  const transaction = await Transaction.create({
    ...data,
    amount,
    status: "PENDING",
  });

  await sendNotification(
    data.driver_id,
    "PAYMENT_PENDING",
    `Payment pending manager confirmation: ${data.liters}L for ${amount.toLocaleString()} RWF`,
    transaction._id
  );

  try {
    const stationRes = await axios.get(`${STATION_SERVICE}/api/stations/${data.station_id}`);
    const managerId = stationRes.data?.data?.manager_id;
    if (managerId) {
      await sendNotification(
        managerId,
        "PAYMENT_PENDING",
        `Confirm payment #${String(transaction._id).slice(-8)} — ${data.liters}L / ${amount.toLocaleString()} RWF`,
        transaction._id
      );
    }
  } catch (err) {
    console.error("Failed to notify station manager:", err.message);
  }

  return transaction;
};

export const confirmPayment = async (transactionId, manager) => {
  const txn = await Transaction.findById(transactionId);
  if (!txn) throw new Error("Transaction not found");
  if (txn.status !== "PENDING") throw new Error("Transaction is not pending confirmation");

  const stationRes = await axios.get(`${STATION_SERVICE}/api/stations/${txn.station_id}`);
  const station = stationRes.data?.data;
  const managerStationId = manager.station_id ? String(manager.station_id) : null;
  const isAssigned =
    managerStationId && managerStationId === String(txn.station_id);
  const isStationManager =
    station?.manager_id && String(station.manager_id) === String(manager.id);

  if (!isAssigned && !isStationManager && manager.role !== "ADMIN") {
    throw new Error("Not authorized to confirm this station's payment");
  }

  try {
    await axios.put(`http://localhost:5003/api/fuel/stock-update`, {
      station_id: txn.station_id,
      fuel_type_id: txn.fuel_type_id,
      amount: txn.liters,
      operation: "subtract",
    });
  } catch (err) {
    await notifyAdmins("FAILED_TRANSACTION", `Stock update failed for txn #${String(txn._id).slice(-8)}`);
    throw new Error(err.response?.data?.message || err.message || "Failed to update inventory");
  }

  txn.status = "COMPLETED";
  txn.updated_at = Date.now();
  await txn.save();

  await sendNotification(
    txn.driver_id,
    "PURCHASE_CONFIRMATION",
    `Fuel purchase confirmed: ${txn.liters}L for ${txn.amount.toLocaleString()} RWF`
  );
  await sendNotification(
    txn.driver_id,
    "PAYMENT_RECEIPT",
    `Payment receipt #${String(txn._id).slice(-8).toUpperCase()} — ${txn.amount.toLocaleString()} RWF`
  );

  try {
    const stationRes = await axios.get(`${STATION_SERVICE}/api/stations/${txn.station_id}`);
    const managerId = stationRes.data?.data?.manager_id;
    if (managerId) {
      await sendNotification(
        managerId,
        "PURCHASE_CONFIRMATION",
        `Payment #${String(txn._id).slice(-8)} confirmed — ${txn.liters}L / ${txn.amount.toLocaleString()} RWF`,
        txn._id
      );
    }
  } catch (_) {}

  return txn;
};

export const getReceiptById = async (transactionId, user) => {
  const txn = await Transaction.findById(transactionId);
  if (!txn) throw new Error("Receipt not found");
  if (user.role === "DRIVER" && String(txn.driver_id) !== String(user.id)) {
    throw new Error("Receipt not found");
  }
  if (
    user.role === "MANAGER" &&
    user.station_id &&
    String(txn.station_id) !== String(user.station_id)
  ) {
    throw new Error("Receipt not found");
  }
  return formatReceipt(txn);
};

export const emailReceiptToDriver = async (transactionId, userId, email) => {
  const txn = await Transaction.findById(transactionId);
  if (!txn) throw new Error("Receipt not found");
  const receipt = formatReceipt(txn);
  console.log(`[EMAIL] Receipt ${receipt.receiptId} sent to ${email}`);
  await sendNotification(
    userId,
    "RECEIPT",
    `Receipt emailed to ${email} for payment #${String(receipt.receiptId).slice(-8).toUpperCase()}`
  );
  return { email, receipt };
};

const toObjectId = (id) => {
  if (!id) return null;
  try {
    return new mongoose.Types.ObjectId(String(id));
  } catch {
    return null;
  }
};

const stationNameCache = new Map();

const getStationName = async (stationId) => {
  const key = String(stationId);
  if (stationNameCache.has(key)) return stationNameCache.get(key);
  try {
    const res = await axios.get(`${STATION_SERVICE}/api/stations/${key}`);
    const name = res.data?.data?.name || "Station";
    stationNameCache.set(key, name);
    return name;
  } catch {
    return "Station";
  }
};

export const getHistory = async (userId, query = {}) => {
  const { page = 1, limit = 10, dateFrom, dateTo } = query;
  const skip = (page - 1) * limit;
  const driverOid = toObjectId(userId);
  if (!driverOid) {
    return {
      data: [],
      meta: { totalSpent: 0, totalLiters: 0, spentThisMonth: 0, completedCount: 0, totalCount: 0, page: 1, limit: parseInt(limit) },
    };
  }

  const filter = { driver_id: driverOid };

  if (dateFrom || dateTo) {
    filter.created_at = {};
    if (dateFrom) filter.created_at.$gte = new Date(dateFrom);
    if (dateTo) filter.created_at.$lte = new Date(dateTo);
  }

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const pipeline = [
    { $match: filter },
    {
      $facet: {
        allMeta: [
          { $group: { _id: null, totalSpent: { $sum: "$amount" }, totalLiters: { $sum: "$liters" }, count: { $sum: 1 } } },
        ],
        completedMeta: [
          { $match: { status: "COMPLETED" } },
          { $group: { _id: null, totalSpent: { $sum: "$amount" }, totalLiters: { $sum: "$liters" }, count: { $sum: 1 } } },
        ],
        monthMeta: [
          { $match: { status: "COMPLETED", created_at: { $gte: startOfMonth } } },
          { $group: { _id: null, totalSpent: { $sum: "$amount" } } },
        ],
        data: [
          { $sort: { created_at: -1 } },
          { $skip: parseInt(skip) },
          { $limit: parseInt(limit) },
        ],
      },
    },
  ];

  const result = await Transaction.aggregate(pipeline);
  const allMeta = result[0]?.allMeta[0] || { totalSpent: 0, totalLiters: 0, count: 0 };
  const completedMeta = result[0]?.completedMeta[0] || { totalSpent: 0, totalLiters: 0, count: 0 };
  const monthMeta = result[0]?.monthMeta[0] || { totalSpent: 0 };
  const rawData = result[0]?.data || [];

  const data = await Promise.all(
    rawData.map(async (txn) => ({
      transactionId: String(txn._id),
      stationId: txn.station_id,
      stationName: await getStationName(txn.station_id),
      fuelTypeId: txn.fuel_type_id,
      totalAmount: txn.amount,
      liters: txn.liters,
      pricePerLiter: txn.liters > 0 ? Math.round(txn.amount / txn.liters) : 0,
      status: txn.status,
      createdAt: txn.created_at,
    }))
  );

  return {
    data,
    meta: {
      totalSpent: completedMeta.totalSpent,
      totalLiters: completedMeta.totalLiters,
      spentThisMonth: monthMeta.totalSpent,
      completedCount: completedMeta.count,
      totalCount: allMeta.count,
      page: parseInt(page),
      limit: parseInt(limit),
    },
  };
};

export const getStationSales = async (stationId, query = {}) => {
  const { dateFrom, dateTo, status } = query;
  const filter = { station_id: stationId };
  if (status) filter.status = status;
  else filter.status = { $in: ["PENDING", "COMPLETED", "FAILED"] };
  if (dateFrom || dateTo) {
    filter.created_at = {};
    if (dateFrom) filter.created_at.$gte = new Date(dateFrom);
    if (dateTo) filter.created_at.$lte = new Date(dateTo);
  }
  return Transaction.find(filter).sort({ created_at: -1 });
};

export const getManagerStats = async (stationId) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const todayCompleted = await Transaction.find({
    station_id: stationId,
    status: "COMPLETED",
    created_at: { $gte: startOfDay },
  });

  const pending = await Transaction.countDocuments({ station_id: stationId, status: "PENDING" });

  const todayRevenue = todayCompleted.reduce((s, t) => s + t.amount, 0);
  const todayLiters = todayCompleted.reduce((s, t) => s + t.liters, 0);

  return {
    todayRevenue,
    todayLiters,
    todayTransactions: todayCompleted.length,
    pendingPayments: pending,
  };
};

const periodToDate = (period) => {
  const now = new Date();
  const start = new Date();
  if (period === "weekly") start.setDate(now.getDate() - 7);
  else if (period === "monthly") start.setMonth(now.getMonth() - 1);
  else start.setHours(0, 0, 0, 0);
  return start;
};

export const getAdminStats = async (period = "daily") => {
  const since = periodToDate(period);

  const completed = await Transaction.find({
    status: "COMPLETED",
    created_at: { $gte: since },
  });

  const failed = await Transaction.countDocuments({
    status: "FAILED",
    created_at: { $gte: since },
  });

  const totalRevenue = completed.reduce((s, t) => s + t.amount, 0);
  const totalFuelSold = completed.reduce((s, t) => s + t.liters, 0);

  const stationMap = {};
  completed.forEach((t) => {
    const sid = String(t.station_id);
    stationMap[sid] = (stationMap[sid] || 0) + t.amount;
  });
  let mostActiveStation = null;
  let maxRev = 0;
  Object.entries(stationMap).forEach(([id, rev]) => {
    if (rev > maxRev) {
      maxRev = rev;
      mostActiveStation = { stationId: id, revenue: rev };
    }
  });

  return {
    period,
    totalRevenue,
    totalFuelSold,
    transactionCount: completed.length,
    failedTransactions: failed,
    mostActiveStation,
  };
};

export const getAllTransactions = async (query = {}) => {
  const { stationId, dateFrom, dateTo, status, page = 1, limit = 50 } = query;
  const filter = {};
  if (stationId) filter.station_id = stationId;
  if (status) filter.status = status;
  if (dateFrom || dateTo) {
    filter.created_at = {};
    if (dateFrom) filter.created_at.$gte = new Date(dateFrom);
    if (dateTo) filter.created_at.$lte = new Date(dateTo);
  }
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    Transaction.find(filter).sort({ created_at: -1 }).skip(skip).limit(parseInt(limit)),
    Transaction.countDocuments(filter),
  ]);
  return {
    data: data.map((txn) => ({
      transactionId: txn._id,
      stationId: txn.station_id,
      driverId: txn.driver_id,
      fuelTypeId: txn.fuel_type_id,
      totalAmount: txn.amount,
      liters: txn.liters,
      status: txn.status,
      createdAt: txn.created_at,
    })),
    meta: { total, page: parseInt(page), limit: parseInt(limit) },
  };
};

export const getUserAnalytics = async (userId) => {
  const driverOid = toObjectId(userId);
  if (!driverOid) {
    return { totalSpent: 0, totalLiters: 0, averagePrice: 0, mostUsedFuelType: null };
  }

  const pipeline = [
    { $match: { driver_id: driverOid, status: 'COMPLETED' } },
    {
      $group: {
        _id: "$fuel_type_id",
        totalSpent: { $sum: "$amount" },
        totalLiters: { $sum: "$liters" },
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ];

  const results = await Transaction.aggregate(pipeline);

  if (!results.length) {
    return {
      totalSpent: 0,
      totalLiters: 0,
      averagePrice: 0,
      mostUsedFuelType: null
    };
  }

  let totalSpent = 0;
  let totalLiters = 0;
  
  results.forEach(r => {
    totalSpent += r.totalSpent;
    totalLiters += r.totalLiters;
  });

  let mostUsedFuelType = "N/A";
  try {
    const typesRes = await axios.get("http://localhost:5003/api/fuel/types");
    const types = typesRes.data?.data || [];
    const topId = String(results[0]._id);
    const match = types.find((t) => String(t._id) === topId);
    if (match?.fuelTypes) mostUsedFuelType = match.fuelTypes;
  } catch (_) {
    mostUsedFuelType = String(results[0]._id).slice(-6);
  }

  return {
    totalSpent,
    totalLiters,
    averagePrice: totalLiters > 0 ? Math.round(totalSpent / totalLiters) : 0,
    mostUsedFuelType,
  };
};
