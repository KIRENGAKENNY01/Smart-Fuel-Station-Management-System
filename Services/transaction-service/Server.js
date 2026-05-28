import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import transactionRoutes from './src/routes/transaction.routes.js';
import prisma from './src/lib/prisma.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/transactions', transactionRoutes);

app.get('/health', (_req, res) => res.json({ status: 'Transaction Service is healthy' }));

const PORT = process.env.PORT || 5004;

prisma.$connect()
  .then(() => {
    console.log('Transaction Service connected to PostgreSQL via Prisma');
    app.listen(PORT, () => console.log(`Transaction Service running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err.message);
    process.exit(1);
  });
