import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "@smart-fuel/shared";
import fuelRoutes from "./src/routes/fuel.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/fuel", fuelRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "Fuel Service is active" });
});

const PORT = process.env.PORT || 5003;

connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Fuel Service running on port ${PORT}`);
  });
});
