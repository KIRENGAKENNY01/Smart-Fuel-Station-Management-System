import User from "../models/user.model.js";
import RefreshToken from "../models/refreshToken.model.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { sanitizeUser } from "../utils/sanitize.js";
import jwt from "jsonwebtoken";



export const signup = async(data) => {
    const existinguser=await User.findOne({email:data.email}); 
    if(existinguser) throw new Error("User arleady exists"); 

    const hashed = await hashPassword(data.password); 
    const user = await User.create({
        ...data, 
        password:hashed 
    }); 


    return sanitizeUser(user); 
}; 


export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");

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
  // We revoke the token by deleting it or marking it revoked
  await RefreshToken.deleteOne({ token });
};