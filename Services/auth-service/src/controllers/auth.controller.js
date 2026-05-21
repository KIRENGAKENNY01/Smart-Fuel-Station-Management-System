import * as AuthService from "../services/auth.service.js";

export const signup = async (req, res) => {
  try {
    const result = await AuthService.signup(req.body);
    res.status(201).json({
      success: true,
      message: result.message,
      requiresApproval: result.requiresApproval,
      data: result.user,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};



export const login = async (req, res) => {
  try {
    const data = await AuthService.login(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const refresh = async (req, res) => {
  try {
    const data = await AuthService.refresh(req.body.token);
    res.status(200).json(data);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    await AuthService.logout(req.body.token);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};