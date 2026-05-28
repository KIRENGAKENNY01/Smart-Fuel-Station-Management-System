import prisma from '../lib/prisma.js';

export const getUserNotifications = async (userId) => {
  return prisma.notification.findMany({
    where: { user_id: userId },
    orderBy: { created_at: 'desc' },
  });
};

export const createNotification = async (data) => {
  return prisma.notification.create({
    data: {
      user_id: data.user_id,
      type: data.type,
      message: data.message,
      transaction_id: data.transaction_id || null,
      is_read: false,
    },
  });
};

export const markAsRead = async (notificationId) => {
  return prisma.notification.update({
    where: { id: notificationId },
    data: { is_read: true },
  });
};
