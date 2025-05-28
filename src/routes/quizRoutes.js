import express from "express";
import {
  addQuestion,
  createQuiz,
  deleteQuestion,
  deleteQuiz,
  getAllQuestions,
  getAllQuizzes,
  getQuiz,
  submitAnswers,
} from "../controllers/quizController.js";
import authenticateToken from "../middleware/authMiddleware/authMiddleware.js";
const router = express.Router();
router.post("/quizzes/createQuiz", createQuiz);
router.get("/quizzes/getAllQuizzes", getAllQuizzes);
router.get("/quizzes/:quizId", getQuiz);
router.post("/quizzes/:quizId/addQuestion", addQuestion);
router.delete("/quizzes/:quizId", deleteQuiz);
// router.get("/quizzes/:quizId/questions",fetchQuestion")
router.post("/quizzes/:quizId/submitAnswers", authenticateToken, submitAnswers);
router.get("/quizzes/:quizId/getQuestion", getAllQuestions);
router.delete("/quizzes/:questionId/deleteQuestion", authenticateToken, deleteQuestion);
export default router;
