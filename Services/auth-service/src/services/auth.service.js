import prisma from '../lib/prisma.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import { sanitizeUser } from '../utils/sanitize.js';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const NOTIFICATION_SERVICE = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:5006';

// Explicit select that excludes password — compatible with all Prisma 5.x versions
const USER_SELECT = {
  id: true,
  full_name: true,
  email: true,
  role: true,
  status: true,
  station_id: true,
  application_message: true,
  is_verified: true,
  created_at: true,
  updated_at: true,
};

const notifyAdmins = async (message) => {
  try {
    const admins = await prisma.user.findMany({
      where: { role: 'ADMIN', status: 'ACTIVE' },
      select: { id: true },
    });

    await Promise.all(
      admins.map((admin) =>
        axios.post(`${NOTIFICATION_SERVICE}/api/notifications/internal`, {
          user_id: admin.id,
          type: 'ALERT',
          message,
        })
      )
    );
  } catch (err) {
    console.error('Failed to notify admins:', err.message);
  }
};

export const signup = async (data) => {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) throw new Error('User already exists');

  if (data.role === 'ADMIN') {
    throw new Error('Admin accounts cannot be created via public signup. Contact system owner.');
  }

  const hashed = await hashPassword(data.password);
  let status = 'ACTIVE';
  let station_id = null;
  let application_message = null;

  if (data.role === 'MANAGER') {
    if (!data.station_id) throw new Error('Please select the station you wish to manage');
    status = 'PENDING_APPROVAL';
    station_id = data.station_id;
    application_message = data.application_message?.trim() || null;

    const existingManager = await prisma.user.findFirst({
      where: { station_id, role: 'MANAGER', status: 'ACTIVE' },
    });
    if (existingManager) throw new Error('This station already has an active manager assigned');

    const pendingAtStation = await prisma.user.findFirst({
      where: { station_id, role: 'MANAGER', status: 'PENDING_APPROVAL' },
    });
    if (pendingAtStation) throw new Error('A manager application for this station is already pending review');
  }

  const user = await prisma.user.create({
    data: {
      full_name: data.full_name,
      email: data.email,
      password: hashed,
      role: data.role || 'DRIVER',
      status,
      station_id,
      application_message,
    },
  });

  if (data.role === 'MANAGER') {
    await notifyAdmins(
      `New manager application: ${user.full_name} (${user.email}) requested station assignment. Review in User Management.`
    );
  }

  return {
    user: sanitizeUser(user),
    requiresApproval: data.role === 'MANAGER',
    message:
      data.role === 'MANAGER'
        ? 'Application submitted. An admin must approve your account before you can sign in.'
        : 'Account created successfully. You can sign in now.',
  };
};

export const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');
  if (user.status === 'SUSPENDED') throw new Error('Account suspended. Contact admin.');
  if (user.status === 'PENDING_APPROVAL')
    throw new Error('Your manager application is pending admin approval. You will be notified once approved.');
  if (user.status === 'REJECTED')
    throw new Error('Your manager application was not approved. Contact admin for details.');

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error('Invalid password');

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await prisma.refreshToken.create({
    data: {
      user_id: user.id,
      token: refreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return { user: sanitizeUser(user), tokens: { accessToken, refreshToken } };
};

export const refresh = async (token) => {
  if (!token) throw new Error('Refresh token required');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const savedToken = await prisma.refreshToken.findFirst({
    where: { token, user_id: decoded.id },
  });
  if (!savedToken) throw new Error('Invalid refresh token');
  if (savedToken.revoked) throw new Error('Token revoked');

  const user = await prisma.user.findUnique({ where: { id: decoded.id } });
  if (!user) throw new Error('User no longer exists');

  return { accessToken: generateAccessToken(user) };
};

export const logout = async (token) => {
  await prisma.refreshToken.deleteMany({ where: { token } });
};

export const getAllUsers = async () => {
  return prisma.user.findMany({
    orderBy: { created_at: 'desc' },
    select: USER_SELECT,
  });
};

export const createUserByAdmin = async (data) => {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) throw new Error('User already exists');
  const hashed = await hashPassword(data.password);
  const user = await prisma.user.create({
    data: {
      full_name: data.full_name,
      email: data.email,
      role: data.role || 'DRIVER',
      password: hashed,
      station_id: data.station_id || null,
      status: 'ACTIVE',
    },
  });
  return sanitizeUser(user);
};

export const updateUserByAdmin = async (id, data) => {
  const updates = {};
  if (data.full_name !== undefined) updates.full_name = data.full_name;
  if (data.email !== undefined) updates.email = data.email;
  if (data.role !== undefined) updates.role = data.role;
  if (data.status !== undefined) updates.status = data.status;
  if (data.station_id !== undefined) updates.station_id = data.station_id;
  if (data.password) updates.password = await hashPassword(data.password);

  const user = await prisma.user.update({ where: { id }, data: updates });
  if (!user) throw new Error('User not found');
  return sanitizeUser(user);
};

export const deleteUserByAdmin = async (id) => {
  await prisma.user.delete({ where: { id } });
  return { message: 'User deleted' };
};

export const suspendUser = async (id) => {
  const user = await prisma.user.update({ where: { id }, data: { status: 'SUSPENDED' } });
  return sanitizeUser(user);
};

export const unsuspendUser = async (id) => {
  const user = await prisma.user.update({ where: { id }, data: { status: 'ACTIVE' } });
  return sanitizeUser(user);
};

export const getProfile = async (userId) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');
  return sanitizeUser(user);
};

export const updateProfile = async (userId, data) => {
  const updates = {};
  if (data.full_name !== undefined) updates.full_name = data.full_name;
  if (data.email !== undefined) {
    const existing = await prisma.user.findFirst({
      where: { email: data.email, NOT: { id: userId } },
    });
    if (existing) throw new Error('Email is already in use');
    updates.email = data.email;
  }
  const user = await prisma.user.update({ where: { id: userId }, data: updates });
  return sanitizeUser(user);
};

export const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');
  const isMatch = await comparePassword(currentPassword, user.password);
  if (!isMatch) throw new Error('Current password is incorrect');
  if (currentPassword === newPassword) throw new Error('New password must be different from current password');
  await prisma.user.update({
    where: { id: userId },
    data: { password: await hashPassword(newPassword) },
  });
  return { message: 'Password updated' };
};

export const getUsersByRole = async (role) => {
  return prisma.user.findMany({
    where: { role, status: 'ACTIVE' },
    select: USER_SELECT,
  });
};

export const getPendingManagers = async () => {
  return prisma.user.findMany({
    where: { role: 'MANAGER', status: 'PENDING_APPROVAL' },
    orderBy: { created_at: 'desc' },
    select: USER_SELECT,
  });
};

export const approveManager = async (userId, stationId) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');
  if (user.role !== 'MANAGER') throw new Error('User is not a manager applicant');
  if (user.status !== 'PENDING_APPROVAL') throw new Error('User is not pending approval');

  const assignStationId = stationId || user.station_id;
  if (!assignStationId) throw new Error('Station must be assigned to approve manager');

  const activeManager = await prisma.user.findFirst({
    where: { station_id: assignStationId, role: 'MANAGER', status: 'ACTIVE', NOT: { id: userId } },
  });
  if (activeManager) throw new Error('Station already has an active manager');

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { status: 'ACTIVE', station_id: assignStationId },
  });

  try {
    await axios.patch(`http://localhost:5002/api/stations/internal/${assignStationId}/assign-manager`, {
      managerId: updated.id,
    });
  } catch (err) {
    console.error('Station manager link failed:', err.message);
  }

  try {
    await axios.post(`${NOTIFICATION_SERVICE}/api/notifications/internal`, {
      user_id: updated.id,
      type: 'ALERT',
      message: 'Your manager account has been approved. You can now sign in and manage your station.',
    });
  } catch (_) {}

  return sanitizeUser(updated);
};

export const rejectManager = async (userId, reason) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');
  if (user.status !== 'PENDING_APPROVAL') throw new Error('User is not pending approval');

  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      status: 'REJECTED',
      application_message: reason || user.application_message,
    },
  });

  try {
    await axios.post(`${NOTIFICATION_SERVICE}/api/notifications/internal`, {
      user_id: updated.id,
      type: 'ALERT',
      message: reason || 'Your manager application was not approved.',
    });
  } catch (_) {}

  return sanitizeUser(updated);
};
