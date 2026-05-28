export const sanitizeUser = (user) => {
  if (!user) return null;
  // Prisma returns plain objects — no .toObject() needed
  const { password, ...safe } = user;
  return safe;
};
