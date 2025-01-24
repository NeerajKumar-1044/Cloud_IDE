import { Router } from "express";
import { CreateQuestion , GetAllQuestions, GetQuestionById, RunCode, SubmitCode} from "../controllers/question.controller.js";
import {authMiddleware} from '../middlewares/auth.middleware.js'

const router = Router();

router.post('/create-question', authMiddleware, CreateQuestion);
router.get('/get-question', authMiddleware, GetQuestionById);
router.get('/get-all-question', GetAllQuestions);
router.post('/run-code',authMiddleware, RunCode);
router.post('/submit-code',authMiddleware, SubmitCode);

export default router;