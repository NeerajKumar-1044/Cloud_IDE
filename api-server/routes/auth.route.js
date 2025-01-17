import express from 'express';
import { registerUser, loginUser, googleAuth, logoutUser } from '../controllers/Auth.controller.js';
import {authMiddleware} from '../middlewares/auth.middleware.js'

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google-login', googleAuth);
router.get('/logout',authMiddleware, logoutUser);

export default router;
