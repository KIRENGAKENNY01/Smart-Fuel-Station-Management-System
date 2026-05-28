import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import reportRoutes from './src/routes/report.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/reports', reportRoutes);

app.get('/health', (_req, res) => res.json({ status: 'Report Service is active' }));

const PORT = process.env.PORT || 5005;

// Report service has no DB of its own — it calls transaction-service via HTTP
app.listen(PORT, () => console.log(`Report Service running on port ${PORT}`));
