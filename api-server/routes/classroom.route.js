import express from 'express';
import {createClassRoom, getAllClassRooms, JoinClassRoom, getEnrolledClassrooms} from '../controllers/classroom.controller.js';
import {authMiddleware} from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create-classroom',authMiddleware, createClassRoom);
router.get('/get-all-classrooms',authMiddleware, getAllClassRooms);
router.post('/join-classroom',authMiddleware, JoinClassRoom);
router.get('/get-enrolled-classroom',authMiddleware, getEnrolledClassrooms);

export default router;