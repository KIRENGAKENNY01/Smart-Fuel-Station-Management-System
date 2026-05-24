import express from "express";
import cors from "cors";
import proxy from "express-http-proxy";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const openapiSpec = JSON.parse(readFileSync(join(__dirname, "openapi.json"), "utf8"));

const app = express();
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(morgan("dev"));

// Swagger API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpec, {
  customSiteTitle: "Smart Fuel API Docs",
  swaggerOptions: { persistAuthorization: true },
}));
app.get("/api-docs/openapi.json", (_req, res) => {
  res.json(openapiSpec);
});

// --- Routing Table ---
const AUTH_SERVICE = process.env.AUTH_SERVICE_URL || "http://localhost:5001";
const STATION_SERVICE = process.env.STATION_SERVICE_URL || "http://localhost:5002";
const FUEL_SERVICE = process.env.FUEL_SERVICE_URL || "http://localhost:5003";
const TRANSACTION_SERVICE = process.env.TRANSACTION_SERVICE_URL || "http://localhost:5004";
const REPORT_SERVICE = process.env.REPORT_SERVICE_URL || "http://localhost:5005";
const NOTIFICATION_SERVICE = process.env.NOTIFICATION_SERVICE_URL || "http://localhost:5006";

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

// Reports
app.use("/api/reports", proxy(REPORT_SERVICE, {
    proxyReqPathResolver: (req) => req.originalUrl
}));

// Notifications
app.use("/api/notifications", proxy(NOTIFICATION_SERVICE, {
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
