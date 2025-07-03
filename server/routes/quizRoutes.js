import { Router } from 'express';
import {
  generateQuiz,
  getAllQuizzes,
  getQuizById,
  submitQuiz,
  getAllResults,
  getUserResults
} from '../controllers/quizController.js';

const router = Router();

router.post('/generate', generateQuiz);
router.get('/', getAllQuizzes);
router.get('/:id', getQuizById);
router.post('/submit', submitQuiz);
router.get('/results/all', getAllResults);
router.get('/results/user/:user', getUserResults);

export default router;