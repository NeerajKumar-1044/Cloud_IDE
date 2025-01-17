import jwt from 'jsonwebtoken';
import {User} from '../models/User.model.js';

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.AccessToken || req.header("Authorization")?.replace("Bearer ", "");
  // console.log("token in middleware:- ", token);

  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = await User.findById(decoded.id).select("-password -refreshToken");
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid', error: err });
  }
};
