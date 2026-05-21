import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB, logger } from "@smart-fuel/shared";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth/users", userRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Auth Service is up and running" });
});

// Database Connection and Server Start
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI is not defined.");
  process.exit(1);
}

connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
  });
});
