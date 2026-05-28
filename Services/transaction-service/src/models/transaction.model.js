import prisma from '../lib/prisma.js';

export const Transaction = prisma.transaction;
export default prisma.transaction;
