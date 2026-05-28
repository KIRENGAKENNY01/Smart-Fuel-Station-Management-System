import prisma from '../lib/prisma.js';
import axios from 'axios';
import nodemailer from 'nodemailer';

// ─── SMTP Transporter singleton ───────────────────────────────────────────────
let _transporter = null;
let _fromAddress = 'noreply@smartfuel.com';

const getTransporter = async () => {
  if (_transporter) return { transporter: _transporter, from: _fromAddress };

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass && host !== 'smtp.ethereal.email') {
    _transporter = nodemailer.createTransport({
      host,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user, pass },
      tls: { rejectUnauthorized: false },
    });
    try {
      await _transporter.verify();
      console.log(`[SMTP] Connected to ${host} as ${user}`);
    } catch (err) {
      _transporter = null;
      console.error(`[SMTP] Connection failed:`, err.message);
      throw new Error(`SMTP connection failed: ${err.message}`);
    }
    _fromAddress = process.env.SMTP_FROM || user;
    return { transporter: _transporter, from: _fromAddress };
  }

  try {
    const testAccount = await nodemailer.createTestAccount();
    _transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: { user: testAccount.user, pass: testAccount.pass },
    });
    _fromAddress = testAccount.user;
    console.log(`[SMTP Ethereal] Test account ready: ${testAccount.user}`);
  } catch (err) {
    throw new Error('Email service unavailable: ' + err.message);
  }
  return { transporter: _transporter, from: _fromAddress };
};
// ─────────────────────────────────────────────────────────────────────────────

const NOTIFICATION_SERVICE = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:5006';
const STATION_SERVICE = process.env.STATION_SERVICE_URL || 'http://localhost:5002';
const AUTH_SERVICE = process.env.AUTH_SERVICE_URL || 'http://localhost:5001';

const sendNotification = async (userId, type, message, transactionId = null) => {
  try {
    await axios.post(`${NOTIFICATION_SERVICE}/api/notifications/internal`, {
      user_id: userId, type, message, transaction_id: transactionId,
    });
  } catch (err) {
    console.error('Failed to send notification:', err.message);
  }
};

const notifyAdmins = async (type, message) => {
  try {
    const res = await axios.get(`${AUTH_SERVICE}/api/auth/users/internal/admins`);
    const admins = res.data?.data || [];
    await Promise.all(admins.map((a) => sendNotification(a.id, type, message)));
  } catch (err) {
    console.error('Failed to notify admins:', err.message);
  }
};

export const formatReceipt = (txn) => ({
  receiptId: txn.id,
  transactionId: txn.id,
  stationId: txn.station_id,
  fuelTypeId: txn.fuel_type_id,
  liters: txn.liters,
  totalAmount: txn.amount,
  pricePerLiter: txn.liters > 0 ? Math.round(txn.amount / txn.liters) : 0,
  status: txn.status,
  issuedAt: txn.created_at,
  company: 'XYZ.ltd',
});

export const processPayment = async (data) => {
  const pricesRes = await axios.get('http://localhost:5003/api/fuel/internal/prices');
  const prices = pricesRes.data.data || pricesRes.data;

  const fuelInfo = prices.find(
    (p) =>
      String(p.station_id) === String(data.station_id) &&
      String(p.fuel_type_id) === String(data.fuel_type_id)
  );
  if (!fuelInfo) throw new Error('Fuel inventory not found for this station and fuel type');

  const amount = data.liters * fuelInfo.price_per_liter;

  const transaction = await prisma.transaction.create({
    data: {
      driver_id: data.driver_id,
      station_id: data.station_id,
      fuel_type_id: data.fuel_type_id,
      liters: data.liters,
      amount,
      status: 'PENDING',
    },
  });

  await sendNotification(
    data.driver_id, 'PAYMENT_PENDING',
    `Payment pending manager confirmation: ${data.liters}L for ${amount.toLocaleString()} RWF`,
    transaction.id
  );

  try {
    const stationRes = await axios.get(`${STATION_SERVICE}/api/stations/internal/${data.station_id}`);
    const managerId = stationRes.data?.data?.manager_id;
    if (managerId) {
      await sendNotification(
        managerId, 'PAYMENT_PENDING',
        `Confirm payment #${transaction.id.slice(-8)} — ${data.liters}L / ${amount.toLocaleString()} RWF`,
        transaction.id
      );
    }
  } catch (err) {
    console.error('Failed to notify station manager:', err.message);
  }

  return transaction;
};

export const confirmPayment = async (transactionId, manager) => {
  const txn = await prisma.transaction.findUnique({ where: { id: transactionId } });
  if (!txn) throw new Error('Transaction not found');
  if (txn.status !== 'PENDING') throw new Error('Transaction is not pending confirmation');

  const stationRes = await axios.get(`${STATION_SERVICE}/api/stations/internal/${txn.station_id}`);
  const station = stationRes.data?.data;
  const isAssigned = manager.station_id && String(manager.station_id) === String(txn.station_id);
  const isStationManager = station?.manager_id && String(station.manager_id) === String(manager.id);

  if (!isAssigned && !isStationManager && manager.role !== 'ADMIN') {
    throw new Error("Not authorized to confirm this station's payment");
  }

  try {
    await axios.put('http://localhost:5003/api/fuel/stock-update', {
      station_id: txn.station_id,
      fuel_type_id: txn.fuel_type_id,
      amount: txn.liters,
      operation: 'subtract',
    });
  } catch (err) {
    await notifyAdmins('FAILED_TRANSACTION', `Stock update failed for txn #${txn.id.slice(-8)}`);
    throw new Error(err.response?.data?.message || err.message || 'Failed to update inventory');
  }

  const updated = await prisma.transaction.update({
    where: { id: transactionId },
    data: { status: 'COMPLETED' },
  });

  await sendNotification(txn.driver_id, 'PURCHASE_CONFIRMATION',
    `Fuel purchase confirmed: ${txn.liters}L for ${txn.amount.toLocaleString()} RWF`);
  await sendNotification(txn.driver_id, 'PAYMENT_RECEIPT',
    `Payment receipt #${txn.id.slice(-8).toUpperCase()} — ${txn.amount.toLocaleString()} RWF`);

  try {
    const managerId = station?.manager_id;
    if (managerId) {
      await sendNotification(managerId, 'PURCHASE_CONFIRMATION',
        `Payment #${txn.id.slice(-8)} confirmed — ${txn.liters}L / ${txn.amount.toLocaleString()} RWF`, txn.id);
    }
  } catch (_) {}

  return updated;
};

export const getReceiptById = async (transactionId, user) => {
  const txn = await prisma.transaction.findUnique({ where: { id: transactionId } });
  if (!txn) throw new Error('Receipt not found');
  if (user.role === 'DRIVER' && txn.driver_id !== user.id) throw new Error('Receipt not found');
  if (user.role === 'MANAGER' && user.station_id && txn.station_id !== user.station_id)
    throw new Error('Receipt not found');
  return formatReceipt(txn);
};

export const emailReceiptToDriver = async (transactionId, userId, email) => {
  const txn = await prisma.transaction.findUnique({ where: { id: transactionId } });
  if (!txn) throw new Error('Receipt not found');
  const receipt = formatReceipt(txn);

  const { transporter, from } = await getTransporter();
  const info = await transporter.sendMail({
    from: `"XYZ.ltd" <${from}>`,
    to: email,
    subject: `Fuel Purchase Receipt #${receipt.receiptId.slice(-8).toUpperCase()}`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px">
        <h2 style="color:#16a34a;margin-bottom:4px">XYZ.ltd — Fuel Receipt</h2>
        <p style="color:#6b7280;font-size:13px;margin-top:0">Receipt #${receipt.receiptId.slice(-8).toUpperCase()}</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
        <table style="width:100%;font-size:14px;border-collapse:collapse">
          <tr><td style="padding:6px 0;color:#6b7280">Date</td><td style="text-align:right">${new Date(receipt.issuedAt).toLocaleString()}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280">Volume</td><td style="text-align:right">${receipt.liters} L</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280">Price / Liter</td><td style="text-align:right">${receipt.pricePerLiter.toLocaleString()} RWF</td></tr>
          <tr style="font-weight:bold;font-size:16px"><td style="padding:10px 0">Total</td><td style="text-align:right;color:#16a34a">${receipt.totalAmount.toLocaleString()} RWF</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280">Status</td><td style="text-align:right">${receipt.status}</td></tr>
        </table>
        <p style="font-size:12px;color:#9ca3af;margin-top:24px">Thank you for fueling with XYZ.ltd</p>
      </div>`,
  });

  console.log(`[EMAIL] Receipt sent to ${email} — Message-ID: ${info.messageId}`);
  const previewUrl = nodemailer.getTestMessageUrl(info);
  if (previewUrl) console.log(`[EMAIL Ethereal] Preview URL: ${previewUrl}`);

  await sendNotification(userId, 'RECEIPT',
    `Receipt emailed to ${email} for payment #${receipt.receiptId.slice(-8).toUpperCase()}`);
  return { email, receipt, previewUrl: previewUrl || null };
};

const stationNameCache = new Map();
const getStationName = async (stationId) => {
  if (stationNameCache.has(stationId)) return stationNameCache.get(stationId);
  try {
    const res = await axios.get(`${STATION_SERVICE}/api/stations/internal/${stationId}`);
    const name = res.data?.data?.name || 'Station';
    stationNameCache.set(stationId, name);
    return name;
  } catch { return 'Station'; }
};

export const getHistory = async (userId, query = {}) => {
  const { page = 1, limit = 10, dateFrom, dateTo } = query;
  const where = { driver_id: userId };
  if (dateFrom || dateTo) {
    where.created_at = {};
    if (dateFrom) where.created_at.gte = new Date(dateFrom);
    if (dateTo) where.created_at.lte = new Date(dateTo);
  }

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [allRows, completedRows, monthRows, total] = await Promise.all([
    prisma.transaction.findMany({ where, orderBy: { created_at: 'desc' }, skip: (page - 1) * parseInt(limit), take: parseInt(limit) }),
    prisma.transaction.findMany({ where: { ...where, status: 'COMPLETED' } }),
    prisma.transaction.findMany({ where: { ...where, status: 'COMPLETED', created_at: { gte: startOfMonth } } }),
    prisma.transaction.count({ where }),
  ]);

  const data = await Promise.all(
    allRows.map(async (txn) => ({
      transactionId: txn.id,
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

  const totalSpent = completedRows.reduce((s, t) => s + t.amount, 0);
  const totalLiters = completedRows.reduce((s, t) => s + t.liters, 0);
  const spentThisMonth = monthRows.reduce((s, t) => s + t.amount, 0);

  return {
    data,
    meta: {
      totalSpent, totalLiters, spentThisMonth,
      completedCount: completedRows.length,
      totalCount: total,
      page: parseInt(page),
      limit: parseInt(limit),
    },
  };
};

export const getStationSales = async (stationId, query = {}) => {
  const { dateFrom, dateTo, status } = query;
  const where = { station_id: stationId };
  if (status) where.status = status;
  if (dateFrom || dateTo) {
    where.created_at = {};
    if (dateFrom) where.created_at.gte = new Date(dateFrom);
    if (dateTo) where.created_at.lte = new Date(dateTo);
  }
  return prisma.transaction.findMany({ where, orderBy: { created_at: 'desc' } });
};

export const getManagerStats = async (stationId) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const [todayCompleted, pending] = await Promise.all([
    prisma.transaction.findMany({ where: { station_id: stationId, status: 'COMPLETED', created_at: { gte: startOfDay } } }),
    prisma.transaction.count({ where: { station_id: stationId, status: 'PENDING' } }),
  ]);

  return {
    todayRevenue: todayCompleted.reduce((s, t) => s + t.amount, 0),
    todayLiters: todayCompleted.reduce((s, t) => s + t.liters, 0),
    todayTransactions: todayCompleted.length,
    pendingPayments: pending,
  };
};

const periodToDate = (period) => {
  const start = new Date();
  if (period === 'weekly') start.setDate(start.getDate() - 7);
  else if (period === 'monthly') start.setMonth(start.getMonth() - 1);
  else start.setHours(0, 0, 0, 0);
  return start;
};

export const getAdminStats = async (period = 'daily') => {
  const since = periodToDate(period);
  const [completed, failed] = await Promise.all([
    prisma.transaction.findMany({ where: { status: 'COMPLETED', created_at: { gte: since } } }),
    prisma.transaction.count({ where: { status: 'FAILED', created_at: { gte: since } } }),
  ]);

  const totalRevenue = completed.reduce((s, t) => s + t.amount, 0);
  const totalFuelSold = completed.reduce((s, t) => s + t.liters, 0);

  const stationMap = {};
  completed.forEach((t) => { stationMap[t.station_id] = (stationMap[t.station_id] || 0) + t.amount; });
  let mostActiveStation = null, maxRev = 0;
  Object.entries(stationMap).forEach(([id, rev]) => { if (rev > maxRev) { maxRev = rev; mostActiveStation = { stationId: id, revenue: rev }; } });

  return { period, totalRevenue, totalFuelSold, transactionCount: completed.length, failedTransactions: failed, mostActiveStation };
};

export const getAllTransactions = async (query = {}) => {
  const { stationId, dateFrom, dateTo, status, page = 1, limit = 50 } = query;
  const where = {};
  if (stationId) where.station_id = stationId;
  if (status) where.status = status;
  if (dateFrom || dateTo) {
    where.created_at = {};
    if (dateFrom) where.created_at.gte = new Date(dateFrom);
    if (dateTo) where.created_at.lte = new Date(dateTo);
  }
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    prisma.transaction.findMany({ where, orderBy: { created_at: 'desc' }, skip, take: parseInt(limit) }),
    prisma.transaction.count({ where }),
  ]);
  return {
    data: data.map((txn) => ({
      transactionId: txn.id, stationId: txn.station_id, driverId: txn.driver_id,
      fuelTypeId: txn.fuel_type_id, totalAmount: txn.amount, liters: txn.liters,
      status: txn.status, createdAt: txn.created_at,
    })),
    meta: { total, page: parseInt(page), limit: parseInt(limit) },
  };
};

export const getUserAnalytics = async (userId) => {
  const completed = await prisma.transaction.findMany({ where: { driver_id: userId, status: 'COMPLETED' } });
  if (!completed.length) return { totalSpent: 0, totalLiters: 0, averagePrice: 0, mostUsedFuelType: null };

  const grouped = new Map();
  completed.forEach((txn) => {
    const key = txn.fuel_type_id;
    const cur = grouped.get(key) || { totalSpent: 0, totalLiters: 0, count: 0 };
    cur.totalSpent += txn.amount; cur.totalLiters += txn.liters; cur.count += 1;
    grouped.set(key, cur);
  });
  const sorted = [...grouped.entries()].sort((a, b) => b[1].count - a[1].count);
  const totalSpent = sorted.reduce((s, [, v]) => s + v.totalSpent, 0);
  const totalLiters = sorted.reduce((s, [, v]) => s + v.totalLiters, 0);

  let mostUsedFuelType = 'N/A';
  try {
    const typesRes = await axios.get(`${process.env.FUEL_SERVICE_URL || 'http://localhost:5003'}/api/fuel/internal/types`);
    const types = typesRes.data?.data || [];
    const topId = sorted[0][0];
    const match = types.find((t) => t.id === topId);
    if (match?.name) mostUsedFuelType = match.name;
  } catch (_) {}

  return { totalSpent, totalLiters, averagePrice: totalLiters > 0 ? Math.round(totalSpent / totalLiters) : 0, mostUsedFuelType };
};
