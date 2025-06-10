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
import adminOnly from "../middleware/adminMiddleware/adminOnly.js";
const router = express.Router();
router.post("/quizzes/createQuiz", authenticateToken, adminOnly, createQuiz);
router.get("/quizzes/getAllQuizzes", getAllQuizzes);
router.get("/quizzes/:quizId", getQuiz);
router.post(
  "/quizzes/:quizId/addQuestion",
  authenticateToken,
  adminOnly,
  addQuestion
);
router.delete("/quizzes/:quizId", authenticateToken, adminOnly, deleteQuiz);
// router.get("/quizzes/:quizId/questions",fetchQuestion")
router.post("/quizzes/:quizId/submitAnswers", authenticateToken, submitAnswers);
router.get("/quizzes/:quizId/getQuestion", getAllQuestions);
router.delete(
  "/quizzes/:questionId/deleteQuestion",
  authenticateToken,
  adminOnly,
  deleteQuestion
);
export default router;
