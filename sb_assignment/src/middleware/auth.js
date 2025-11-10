import { verifyToken } from '../utils/jwt.js';

export const authMiddleware = ({ req }) => {
  const header = req.headers.authorization || '';
  if (header.startsWith('Bearer ')) {
    const token = header.replace('Bearer ', '');
    try {
      const user = verifyToken(token);
      return { user };
    } catch {
      console.log('Invalid token');
    }
  }
  return {};
};
