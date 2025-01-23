import express from 'express';
import {authMiddleware} from '../middlewares/auth.middleware.js';
import {getCurrentUser} from '../controllers/user.controller.js';


const router = express.Router();

router.get('/get-current-user', authMiddleware, getCurrentUser);

export default router;