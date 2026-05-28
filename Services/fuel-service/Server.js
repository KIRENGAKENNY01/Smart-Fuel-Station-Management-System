import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fuelRoutes from './src/routes/fuel.routes.js';
import prisma from './src/lib/prisma.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/fuel', fuelRoutes);

app.get('/health', (_req, res) => res.json({ status: 'Fuel Service is active' }));

const PORT = process.env.PORT || 5003;

prisma.$connect()
  .then(() => {
    console.log('Fuel Service connected to PostgreSQL via Prisma');
    app.listen(PORT, () => console.log(`Fuel Service running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err.message);
    process.exit(1);
  });
