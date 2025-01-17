import express from 'express';
import {createClassRoom, getAllClassRooms} from '../controllers/classroom.controller.js';
import {authMiddleware} from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create-classroom',authMiddleware, createClassRoom); // needs to be verified
router.get('/get-all-classrooms',authMiddleware, getAllClassRooms); // needs to be verified

export default router;