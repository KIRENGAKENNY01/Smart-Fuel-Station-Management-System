import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "@smart-fuel/shared";
import reportRoutes from "./src/routes/report.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/reports", reportRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "Report Service is active" });
});

const PORT = process.env.PORT || 5005;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI is not defined. Create Services/report-service/.env");
  process.exit(1);
}

connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Report Service running on port ${PORT}`);
  });
});
