import bcrypt from 'bcrypt';
import { prisma } from '../config/db.js';
import { generateToken } from '../utils/jwt.js';

export const userService = {
  register: async (email, password, name) => {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hashed, name } });
    const token = generateToken({ userId: user.id });
    return { token, user };
  },

  login: async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Invalid credentials');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid credentials');
    const token = generateToken({ userId: user.id });
    return { token, user };
  },
};
