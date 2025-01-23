import { Router } from "express";
import { CreateQuestion , GetAllQuestions, GetQuestionById} from "../controllers/question.controller.js";
import {authMiddleware} from '../middlewares/auth.middleware.js'

const router = Router();

router.post('/create-question', authMiddleware, CreateQuestion);
router.get('/get-all-question', GetAllQuestions);
router.get('/get-question', authMiddleware, GetQuestionById);

export default router;