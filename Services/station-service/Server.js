import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import stationRoutes from './src/routes/station.routes.js';
import prisma from './src/lib/prisma.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/stations', stationRoutes);

app.get('/health', (_req, res) => res.json({ status: 'Station Service is alive' }));

const PORT = process.env.PORT || 5002;

prisma.$connect()
  .then(() => {
    console.log('Station Service connected to PostgreSQL via Prisma');
    app.listen(PORT, () => console.log(`Station Service running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err.message);
    process.exit(1);
  });
