import Notification from "../models/notification.model.js";
import mongoose from "mongoose";

export const getUserNotifications = async (userId) => {
  let uid = userId;
  try {
    uid = new mongoose.Types.ObjectId(String(userId));
  } catch (_) {
    return [];
  }
  return await Notification.find({ user_id: uid }).sort({ created_at: -1 });
};

export const createNotification = async (data) => {
  return await Notification.create(data);
};

export const markAsRead = async (notificationId) => {
  return await Notification.findByIdAndUpdate(notificationId, { is_read: true }, { new: true });
};
