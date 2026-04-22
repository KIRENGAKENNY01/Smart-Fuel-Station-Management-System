import * as TransactionService from "../services/transaction.service.js";
import { response } from "@smart-fuel/shared";

export const createTransaction = async (req, res) => {
  try {
    // Inject the current user's ID from the token
    const transactionData = {
      ...req.body,
      driver_id: req.user.id
    };

    const transaction = await TransactionService.processPayment(transactionData);
    response(res, 201, "Transaction completed", transaction);
  } catch (err) {
    response(res, 400, err.message);
  }
};

export const getMyHistory = async (req, res) => {
  try {
    const history = await TransactionService.getHistory(req.user.id);
    response(res, 200, "History retrieved", history);
  } catch (err) {
    response(res, 500, err.message);
  }
};

export const getSalesByStation = async (req, res) => {
  try {
    const sales = await TransactionService.getStationSales(req.params.stationId);
    response(res, 200, "Sales data retrieved", sales);
  } catch (err) {
    response(res, 500, err.message);
  }
};
