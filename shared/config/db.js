// db.js — legacy pg pool removed. Each service now uses its own Prisma client.
// Kept as an empty stub so any stale imports don't break at module resolution.

export const connectDB = async () => {
  console.warn('[shared/db] connectDB() called but is a no-op — use Prisma in each service.');
};

export const getPool = () => {
  throw new Error('[shared/db] getPool() is no longer available — use Prisma in each service.');
};

export const query = () => {
  throw new Error('[shared/db] query() is no longer available — use Prisma in each service.');
};
