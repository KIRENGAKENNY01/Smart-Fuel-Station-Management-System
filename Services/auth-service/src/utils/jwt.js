import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,           // Prisma uses `id`, not `_id`
      role: user.role,
      email: user.email,
      station_id: user.station_id || null,
    },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role, email: user.email, station_id: user.station_id || null },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};
