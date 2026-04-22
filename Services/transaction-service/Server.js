import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "@smart-fuel/shared";
import transactionRoutes from "./src/routes/transaction.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/transactions", transactionRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "Transaction Service is healthy" });
});

const PORT = process.env.PORT || 5004;

connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Transaction Service running on port ${PORT}`);
  });
});
