import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const generateToken = (payload) =>
  jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });

export const verifyToken = (token) => jwt.verify(token, config.jwtSecret);
