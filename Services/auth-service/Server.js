import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './src/routes/auth.routes.js';
import userRoutes from './src/routes/user.routes.js';
import prisma from './src/lib/prisma.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/auth/users', userRoutes);

app.get('/health', (_req, res) => res.json({ status: 'Auth Service is up and running' }));

const PORT = process.env.PORT || 5001;

prisma.$connect()
  .then(() => {
    console.log('Auth Service connected to PostgreSQL via Prisma');
    app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err.message);
    process.exit(1);
  });
