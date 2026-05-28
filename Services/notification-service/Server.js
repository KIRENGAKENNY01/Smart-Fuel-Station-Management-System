import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import notificationRoutes from './src/routes/notification.routes.js';
import prisma from './src/lib/prisma.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/notifications', notificationRoutes);

app.get('/health', (_req, res) => res.json({ status: 'Notification Service is active' }));

const PORT = process.env.PORT || 5006;

prisma.$connect()
  .then(() => {
    console.log('Notification Service connected to PostgreSQL via Prisma');
    app.listen(PORT, () => console.log(`Notification Service running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err.message);
    process.exit(1);
  });
