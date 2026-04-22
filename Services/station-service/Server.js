import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "@smart-fuel/shared";
import stationRoutes from "./src/routes/station.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/stations", stationRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Station Service is alive" });
});

const PORT = process.env.PORT || 5002;

connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Station Service running on port ${PORT}`);
  });
});
