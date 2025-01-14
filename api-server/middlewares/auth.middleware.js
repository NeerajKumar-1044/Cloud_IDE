import jwt from 'jsonwebtoken';
import {User} from '../models/User.model.js';

export const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid', error: err });
  }
};
