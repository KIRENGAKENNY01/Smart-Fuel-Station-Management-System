import { PrismaClient } from '../src/generated/prisma/index.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('Admin@1234', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@smartfuel.com' },
    update: {},
    create: {
      full_name: 'System Admin',
      email: 'admin@smartfuel.com',
      password,
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });

  console.log('✅ Admin seeded:', admin.email);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
