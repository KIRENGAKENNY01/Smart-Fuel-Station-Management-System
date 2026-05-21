import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "@smart-fuel/shared";
import notificationRoutes from "./src/routes/notification.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/notifications", notificationRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "Notification Service is active" });
});

const PORT = process.env.PORT || 5006;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI is not defined. Create Services/notification-service/.env");
  process.exit(1);
}

connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
  });
});
