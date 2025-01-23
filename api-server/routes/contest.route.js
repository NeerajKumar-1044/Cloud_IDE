import { Router } from "express";
import {createContest, getAllContests } from "../controllers/contest.controller.js";
import {authMiddleware} from '../middlewares/auth.middleware.js'

const router = Router();

router.post('/create-contest', authMiddleware, createContest);
router.get('/get-all-contests', authMiddleware, getAllContests);

export default router;