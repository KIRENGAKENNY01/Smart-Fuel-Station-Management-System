import * as TransactionService from "../services/transaction.service.js";
import { response } from "@smart-fuel/shared";

export const createTransaction = async (req, res) => {
  try {
    const { stationId, fuelType, liters } = req.body;
    if (!stationId || !fuelType || !liters) {
      return response(res, 400, "stationId, fuelType, and liters are required");
    }

    const transactionData = {
      ...req.body,
      station_id: stationId,
      fuel_type_id: fuelType,
      liters,
      driver_id: req.user.id
    };

    const transaction = await TransactionService.processPayment(transactionData);
    
    const formatted = {
      transactionId: transaction._id,
      station: transaction.station_id,
      fuelType: transaction.fuel_type_id,
      liters: transaction.liters,
      pricePerLiter: transaction.amount / transaction.liters,
      totalAmount: transaction.amount,
      createdAt: transaction.created_at || Date.now()
    };
    
    response(res, 201, "Payment submitted — awaiting manager confirmation", {
      ...formatted,
      status: transaction.status,
    });
  } catch (err) {
    console.error("Transaction Error:", err.response?.data || err);
    const errorMessage = err.response?.data?.message || err.message || "Unknown error occurred";
    response(res, 400, errorMessage);
  }
};

export const getMyHistory = async (req, res) => {
  try {
    const { data, meta } = await TransactionService.getHistory(req.user.id, req.query);
    response(res, 200, "History retrieved", data, meta);
  } catch (err) {
    response(res, 500, err.message);
  }
};

export const getSalesByStation = async (req, res) => {
  try {
    const sales = await TransactionService.getStationSales(req.params.stationId, req.query);
    response(res, 200, "Sales data retrieved", sales);
  } catch (err) {
    response(res, 500, err.message);
  }
};

export const getManagerDashboard = async (req, res) => {
  try {
    const stationId = req.user.station_id || req.query.stationId;
    if (!stationId) return response(res, 400, "Manager station not assigned");
    const stats = await TransactionService.getManagerStats(stationId);
    response(res, 200, "Manager stats retrieved", stats);
  } catch (err) {
    response(res, 500, err.message);
  }
};

export const confirmTransaction = async (req, res) => {
  try {
    const txn = await TransactionService.confirmPayment(req.params.id, req.user);
    try {
      const driverRes = await import("axios").then((m) =>
        m.default.get(`${process.env.AUTH_SERVICE_URL || "http://localhost:5001"}/api/auth/users/internal/${txn.driver_id}`)
      );
      const driverEmail = driverRes.data?.data?.email;
      if (driverEmail) {
        await TransactionService.emailReceiptToDriver(txn._id, txn.driver_id, driverEmail);
      }
    } catch (_) {
      if (req.body.email) {
        await TransactionService.emailReceiptToDriver(txn._id, txn.driver_id, req.body.email);
      }
    }
    response(res, 200, "Payment confirmed", {
      transactionId: txn._id,
      status: txn.status,
      totalAmount: txn.amount,
    });
  } catch (err) {
    response(res, 400, err.message);
  }
};

export const getAdminDashboard = async (req, res) => {
  try {
    const stats = await TransactionService.getAdminStats(req.query.period || "daily");
    response(res, 200, "Admin stats retrieved", stats);
  } catch (err) {
    response(res, 500, err.message);
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const { data, meta } = await TransactionService.getAllTransactions(req.query);
    response(res, 200, "Transactions retrieved", data, meta);
  } catch (err) {
    response(res, 500, err.message);
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const analytics = await TransactionService.getUserAnalytics(req.user.id);
    response(res, 200, "Analytics retrieved successfully", analytics);
  } catch (err) {
    response(res, 500, err.message);
  }
};

export const getReceipt = async (req, res) => {
  try {
    const receipt = await TransactionService.getReceiptById(req.params.id, req.user);
    response(res, 200, "Receipt retrieved", receipt);
  } catch (err) {
    response(res, 404, err.message);
  }
};

export const downloadReceipt = async (req, res) => {
  try {
    const receipt = await TransactionService.getReceiptById(req.params.id, req.user);
    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="receipt-${String(receipt.receiptId).slice(-8)}.json"`
    );
    return res.status(200).json(receipt);
  } catch (err) {
    response(res, 404, err.message);
  }
};

export const emailReceipt = async (req, res) => {
  try {
    const email = req.body.email || req.user.email;
    if (!email) return response(res, 400, "Email address is required");
    const result = await TransactionService.emailReceiptToDriver(
      req.params.id,
      req.user.id,
      email
    );
    response(res, 200, `Receipt sent to ${result.email}`, result);
  } catch (err) {
    response(res, 400, err.message);
  }
};
