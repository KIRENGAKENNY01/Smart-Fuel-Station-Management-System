import express from "express";
import cors from "cors";
import proxy from "express-http-proxy";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

// --- Routing Table ---
const AUTH_SERVICE = process.env.AUTH_SERVICE_URL || "http://localhost:5001";
const STATION_SERVICE = process.env.STATION_SERVICE_URL || "http://localhost:5002";
const FUEL_SERVICE = process.env.FUEL_SERVICE_URL || "http://localhost:5003";
const TRANSACTION_SERVICE = process.env.TRANSACTION_SERVICE_URL || "http://localhost:5004";

// Auth
app.use("/api/auth", proxy(AUTH_SERVICE, { 
    proxyReqPathResolver: (req) => req.originalUrl 
}));

// Stations
app.use("/api/stations", proxy(STATION_SERVICE, { 
    proxyReqPathResolver: (req) => req.originalUrl 
}));

// Fuel
app.use("/api/fuel", proxy(FUEL_SERVICE, { 
    proxyReqPathResolver: (req) => req.originalUrl 
}));

// Transactions
app.use("/api/transactions", proxy(TRANSACTION_SERVICE, { 
    proxyReqPathResolver: (req) => req.originalUrl 
}));

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "API Gateway is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`GATEWAY: Smart Fuel System Gateway running on port ${PORT}`);
});
