import Quiz from "../models/quiz.js";
import Question from "../models/question.js";
import quiz from "../models/quiz.js";
import Score from "../models/score.js";
// Create a new quiz
export const createQuiz = async (req, res) => {
  let { title, description, category } = req.body;

  try {
    if (!title || !description || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Trim input fields
    title = title?.trim();

    // Check if a quiz with the same title already exists (case-insensitive)
    const existingQuiz = await Quiz.findOne({
      title: new RegExp(`^${title}$`, "i"),
    });
    if (existingQuiz) {
      return res
        .status(409)
        .json({ message: "Quiz with this title already exists" });
    }
    const newQuiz = await Quiz.create({
      title,
      description,
      category,
      questions: [],
    });

    res.status(201).json({
      message: "Quiz created successfully",
      quiz: {
        id: newQuiz._id,
        title: newQuiz.title,
        description: newQuiz.description,
        questions: newQuiz.questions,
        category: newQuiz.category,
      },
    });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res
      .status(500)
      .json({ message: "Error creating quiz", error: error.message });
  }
};
// Get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    if (!quizzes || quizzes.length === 0) {
      return res.stats(404).json({
        message: "No quizzes found",
      });
    }
    const quizzesWithQuestions = await Promise.all(
      quizzes.map(async (quiz) => {
        const questions = await Question.find({ quizId: quiz.id });
        return {
          id: quiz._id,
          title: quiz.title,
          description: quiz.description,
          category: quiz.category,
          questions,
        };
      })
    );
    res.status(200).json({
      message: "Quizzes fetched successfully",
      quizzes: quizzesWithQuestions,
    });
  } catch (error) {
    console.log("Error fetching quizzes:", error);
    res
      .status(500)
      .json({ message: "Error fetching quizzes", error: error.message });
  }
};
//get quiz
export const getQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.stats(404).json({ message: "Quiz not found" });
    }
    const questions = await Question.find({ quizId });

    res.status(200).json({
      message: "Quiz fetched successfully",
      quiz,
      questions,
    });
  } catch (error) {
    console.log("Error fetching quizzes:", error);
    res
      .status(500)
      .json({ message: "Error fetching quizzes", error: error.message });
  }
};

// Add a question to a quiz
export const addQuestion = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { text, options, correctIndex } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    const newQuestion = await Question.create({
      quizId,
      text,
      options,
      correctIndex,
    });

    res.status(201).json({
      message: "Question added successfully",
      question: newQuestion,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding question", error: error.message });
  }
};
export const deleteQuestion = async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const deletedQuestion = await Question.findByIdAndDelete(questionId);
    if (!deletedQuestion) {
      return res.status(404).json({
        message: "Question not found",
      });
    }
    res.status(200).json({
      message: "Question deleted successfully",
      question: deletedQuestion,
    });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({
      message: "Error deleting question",
      error: error.message,
    });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;

    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({
      message: "Quiz deleted successfully",
      quiz: deletedQuiz,
    });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({
      message: "Error deleting quiz",
      error: error.message,
    });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const questions = await Question.find({ quizId });

    res.status(200).json({
      message: "Questions fetched successfully",
      questions,
    });
  } catch (error) {
    console.error("Error fetching question:", error);
    res
      .status(500)
      .json({ message: "Error fetching question", error: error.message });
  }
};
// Submit answers
export const submitAnswers = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const { answers } = req.body;
    const userId = req.user.id; // In real case, extract from session/token

    // Fetch all questions for this quiz
    const questions = await Question.find({ quizId });

    if (!questions || questions.length === 0) {
      return res
        .status(404)
        .json({ message: "No questions found for this quiz" });
    }

    let score = 0;
    answers?.forEach((ans) => {
      // Find the question by ID
      const question = questions.find(
        (q) => q._id.toString() === ans.questionId
      );
      if (question && question.correctIndex === ans.selectedIndex) {
        score++;
      }
    });

    const savedScore = await Score.create({
      quizId,
      userId,
      score: score,
      totalQuestions: questions.length,
    });

    res.status(200).json({
      message: "Answers submitted successfully",
      score: {
        userId,
        quizId,
        score,
        totalQuestions: questions.length,
        takenAt: savedScore.takenAt,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error submitting answers", error: error.message });
  }
};
