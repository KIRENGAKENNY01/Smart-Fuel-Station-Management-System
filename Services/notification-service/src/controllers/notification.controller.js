import * as NotificationService from "../services/notification.service.js";
import { response } from "@smart-fuel/shared";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await NotificationService.getUserNotifications(req.user.id);
    response(res, 200, "Notifications retrieved successfully", notifications);
  } catch (err) {
    response(res, 500, err.message);
  }
};

export const markRead = async (req, res) => {
  try {
    const notification = await NotificationService.markAsRead(req.params.id);
    response(res, 200, "Notification marked as read", notification);
  } catch (err) {
    response(res, 500, err.message);
  }
};

export const createInternal = async (req, res) => {
  try {
    const { user_id, type, message, transaction_id } = req.body;
    if (!user_id || !type || !message) {
      return response(res, 400, "user_id, type, and message are required");
    }
    const notification = await NotificationService.createNotification({
      user_id,
      type,
      message,
      transaction_id: transaction_id || null,
    });
    response(res, 201, "Notification created", notification);
  } catch (err) {
    response(res, 500, err.message);
  }
};
