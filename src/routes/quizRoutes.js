import express from "express";
import {
  addQuestion,
  createQuiz,
  getAllQuizzes,
  submitAnswers,
} from "../controllers/quizController.js";
const router = express.Router();
router.post("/quizzes/createQuiz", createQuiz);
router.get("/quizzes/getAllQuizzes", getAllQuizzes);
router.post("/quizzes/:quizId/addQuestion", addQuestion);
// router.get("/quizzes/:quizId/questions",fetchQuestion")
router.post("/quizzes/:quizId/submit", submitAnswers);
export default router;