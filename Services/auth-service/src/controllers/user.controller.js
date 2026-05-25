import * as AuthService from "../services/auth.service.js";
import { response } from "@smart-fuel/shared";

export const listUsers = async (req, res) => {
  try {
    const users = await AuthService.getAllUsers();
    response(res, 200, "Users retrieved", users);
  } catch (err) {
    response(res, 500, err.message);
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await AuthService.createUserByAdmin(req.body);
    response(res, 201, "User created", user);
  } catch (err) {
    response(res, 400, err.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await AuthService.updateUserByAdmin(req.params.id, req.body);
    response(res, 200, "User updated", user);
  } catch (err) {
    response(res, 400, err.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const result = await AuthService.deleteUserByAdmin(req.params.id);
    response(res, 200, result.message);
  } catch (err) {
    response(res, 404, err.message);
  }
};

export const suspend = async (req, res) => {
  try {
    const user = await AuthService.suspendUser(req.params.id);
    response(res, 200, "User suspended", user);
  } catch (err) {
    response(res, 400, err.message);
  }
};

export const unsuspend = async (req, res) => {
  try {
    const user = await AuthService.unsuspendUser(req.params.id);
    response(res, 200, "User unsuspended", user);
  } catch (err) {
    response(res, 400, err.message);
  }
};

export const listPendingManagers = async (req, res) => {
  try {
    const users = await AuthService.getPendingManagers();
    response(res, 200, "Pending manager applications retrieved", users);
  } catch (err) {
    response(res, 500, err.message);
  }
};

export const approveManager = async (req, res) => {
  try {
    const user = await AuthService.approveManager(req.params.id, req.body.station_id);
    response(res, 200, "Manager approved and assigned to station", user);
  } catch (err) {
    response(res, 400, err.message);
  }
};

export const rejectManager = async (req, res) => {
  try {
    const user = await AuthService.rejectManager(req.params.id, req.body.reason);
    response(res, 200, "Manager application rejected", user);
  } catch (err) {
    response(res, 400, err.message);
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await AuthService.getProfile(req.user.id);
    response(res, 200, "Profile retrieved", user);
  } catch (err) {
    response(res, 404, err.message);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await AuthService.updateProfile(req.user.id, req.body);
    response(res, 200, "Profile updated", user);
  } catch (err) {
    response(res, 400, err.message);
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const result = await AuthService.changePassword(req.user.id, currentPassword, newPassword);
    response(res, 200, result.message);
  } catch (err) {
    response(res, 400, err.message);
  }
};

export const setStationInternal = async (req, res) => {
  try {
    const user = await AuthService.updateUserByAdmin(req.params.id, {
      station_id: req.body.station_id,
      role: "MANAGER",
    });
    response(res, 200, "Manager station updated", user);
  } catch (err) {
    response(res, 400, err.message);
  }
};

export const getUserInternal = async (req, res) => {
  try {
    const user = await AuthService.getProfile(req.params.id);
    response(res, 200, "User retrieved", user);
  } catch (err) {
    response(res, 404, err.message);
  }
};

export const listAdmins = async (_req, res) => {
  try {
    const users = await AuthService.getUsersByRole("ADMIN");
    response(res, 200, "Admins retrieved", users);
  } catch (err) {
    response(res, 500, err.message);
  }
};
