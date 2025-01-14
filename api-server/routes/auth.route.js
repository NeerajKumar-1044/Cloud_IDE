import express from 'express';
import { registerUser, loginUser, googleAuth, logoutUser } from '../controllers/Auth.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google-login', googleAuth); // http://localhost:5001/api/users/google-login
router.post('/logout', logoutUser);

export default router;
