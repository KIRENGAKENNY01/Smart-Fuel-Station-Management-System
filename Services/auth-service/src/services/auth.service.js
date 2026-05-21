import User from "../models/user.model.js";
import RefreshToken from "../models/refreshToken.model.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { sanitizeUser } from "../utils/sanitize.js";
import jwt from "jsonwebtoken";
import axios from "axios";

const NOTIFICATION_SERVICE = process.env.NOTIFICATION_SERVICE_URL || "http://localhost:5006";

const notifyAdmins = async (message) => {
  try {
    const res = await axios.get("http://localhost:5001/api/auth/users/internal/admins");
    const admins = res.data?.data || [];
    await Promise.all(
      admins.map((admin) =>
        axios.post(`${NOTIFICATION_SERVICE}/api/notifications/internal`, {
          user_id: admin._id,
          type: "ALERT",
          message,
        })
      )
    );
  } catch (err) {
    console.error("Failed to notify admins:", err.message);
  }
};

export const signup = async (data) => {
  const existinguser = await User.findOne({ email: data.email });
  if (existinguser) throw new Error("User already exists");

  if (data.role === "ADMIN") {
    throw new Error("Admin accounts cannot be created via public signup. Contact system owner.");
  }

  const hashed = await hashPassword(data.password);

  let status = "ACTIVE";
  let station_id = null;
  let application_message = null;

  if (data.role === "MANAGER") {
    if (!data.station_id) {
      throw new Error("Please select the station you wish to manage");
    }
    status = "PENDING_APPROVAL";
    station_id = data.station_id;
    application_message = data.application_message?.trim() || null;

    const existingManager = await User.findOne({
      station_id,
      role: "MANAGER",
      status: "ACTIVE",
    });
    if (existingManager) {
      throw new Error("This station already has an active manager assigned");
    }

    const pendingAtStation = await User.findOne({
      station_id,
      role: "MANAGER",
      status: "PENDING_APPROVAL",
    });
    if (pendingAtStation) {
      throw new Error("A manager application for this station is already pending review");
    }
  }

  const user = await User.create({
    full_name: data.full_name,
    email: data.email,
    password: hashed,
    role: data.role || "DRIVER",
    status,
    station_id,
    application_message,
  });

  if (data.role === "MANAGER") {
    await notifyAdmins(
      `New manager application: ${user.full_name} (${user.email}) requested station assignment. Review in User Management.`
    );
  }

  return {
    user: sanitizeUser(user),
    requiresApproval: data.role === "MANAGER",
    message:
      data.role === "MANAGER"
        ? "Application submitted. An admin must approve your account before you can sign in."
        : "Account created successfully. You can sign in now.",
  };
};


export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");
  if (user.status === "SUSPENDED") throw new Error("Account suspended. Contact admin.");
  if (user.status === "PENDING_APPROVAL") {
    throw new Error("Your manager application is pending admin approval. You will be notified once approved.");
  }
  if (user.status === "REJECTED") {
    throw new Error("Your manager application was not approved. Contact admin for details.");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid password");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Save the refresh token to the database
  await RefreshToken.create({
    user_id: user._id,
    token: refreshToken,
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days matching jwt config
  });

  return {
    user: sanitizeUser(user),
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};

export const refresh = async (token) => {
  if (!token) throw new Error("Refresh token required");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const savedToken = await RefreshToken.findOne({ token, user_id: decoded.id });

  if (!savedToken) throw new Error("Invalid refresh token");
  if (savedToken.revoked) throw new Error("Token revoked");

  const user = await User.findById(decoded.id);
  if (!user) throw new Error("User no longer exists");

  const newAccessToken = generateAccessToken(user);
  
  return { accessToken: newAccessToken };
};

export const logout = async (token) => {
  await RefreshToken.deleteOne({ token });
};

export const getAllUsers = async () => {
  return User.find().select("-password").sort({ created_at: -1 });
};

export const createUserByAdmin = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new Error("User already exists");
  const hashed = await hashPassword(data.password);
  const user = await User.create({
    full_name: data.full_name,
    email: data.email,
    role: data.role || "DRIVER",
    password: hashed,
    station_id: data.station_id || null,
    status: "ACTIVE",
  });
  return sanitizeUser(user);
};

export const updateUserByAdmin = async (id, data) => {
  const updates = { ...data, updated_at: Date.now() };
  delete updates.password;
  if (data.password) {
    updates.password = await hashPassword(data.password);
  }
  const user = await User.findByIdAndUpdate(id, updates, { new: true });
  if (!user) throw new Error("User not found");
  return sanitizeUser(user);
};

export const deleteUserByAdmin = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error("User not found");
  return { message: "User deleted" };
};

export const suspendUser = async (id) => {
  const user = await User.findByIdAndUpdate(id, { status: "SUSPENDED", updated_at: Date.now() }, { new: true });
  if (!user) throw new Error("User not found");
  return sanitizeUser(user);
};

export const getProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  return sanitizeUser(user);
};

export const updateProfile = async (userId, { full_name, email }) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { full_name, email, updated_at: Date.now() },
    { new: true }
  );
  if (!user) throw new Error("User not found");
  return sanitizeUser(user);
};

export const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  const isMatch = await comparePassword(currentPassword, user.password);
  if (!isMatch) throw new Error("Current password is incorrect");
  user.password = await hashPassword(newPassword);
  user.updated_at = Date.now();
  await user.save();
  return { message: "Password updated" };
};

export const getUsersByRole = async (role) => {
  return User.find({ role, status: "ACTIVE" }).select("-password");
};

export const getPendingManagers = async () => {
  return User.find({ role: "MANAGER", status: "PENDING_APPROVAL" })
    .select("-password")
    .sort({ created_at: -1 });
};

export const approveManager = async (userId, stationId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  if (user.role !== "MANAGER") throw new Error("User is not a manager applicant");
  if (user.status !== "PENDING_APPROVAL") throw new Error("User is not pending approval");

  const assignStationId = stationId || user.station_id;
  if (!assignStationId) throw new Error("Station must be assigned to approve manager");

  const activeManager = await User.findOne({
    station_id: assignStationId,
    role: "MANAGER",
    status: "ACTIVE",
    _id: { $ne: userId },
  });
  if (activeManager) throw new Error("Station already has an active manager");

  user.status = "ACTIVE";
  user.station_id = assignStationId;
  user.updated_at = Date.now();
  await user.save();

  try {
    await axios.patch(
      `http://localhost:5002/api/stations/internal/${assignStationId}/assign-manager`,
      { managerId: user._id }
    );
    await axios.put(`http://localhost:5001/api/auth/users/internal/${user._id}/station`, {
      station_id: assignStationId,
    });
  } catch (err) {
    console.error("Station manager link failed:", err.message);
  }

  try {
    await axios.post(`${NOTIFICATION_SERVICE}/api/notifications/internal`, {
      user_id: user._id,
      type: "ALERT",
      message: "Your manager account has been approved. You can now sign in and manage your station.",
    });
  } catch (_) {}

  return sanitizeUser(user);
};

export const rejectManager = async (userId, reason) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  if (user.status !== "PENDING_APPROVAL") throw new Error("User is not pending approval");

  user.status = "REJECTED";
  user.application_message = reason || user.application_message;
  user.updated_at = Date.now();
  await user.save();

  try {
    await axios.post(`${NOTIFICATION_SERVICE}/api/notifications/internal`, {
      user_id: user._id,
      type: "ALERT",
      message: reason || "Your manager application was not approved.",
    });
  } catch (_) {}

  return sanitizeUser(user);
};