import question from "../models/question.js";
import Quiz from "../models/quiz.js";

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

// Add a question to a quiz
export const addQuestion = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { text, options, correctIndex } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    const newQuestion = await question.create({
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
// Submit answers
export const submitAnswers = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const { answers } = req.body;
    const userId = "dummyUserId"; // In real case, extract from session/token
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    let score = 0;
    answers.forEach((ans) => {
      const question = quiz.questions.id(ans.questionId);
      if (question && question.correctIndex === ans.selectedIndex) {
        score++;
      }
    });
    const savesScore = await score.create({
      quizId,
      userId,
      score,
      totalQuestions: quiz.questions.length,
    });
    res.status(200).json({
      message: "Answers submitted successfully",
      score: {
        userId,
        quizId,
        score,
        totalQuestions: quiz.questions.length,
        takenAt: savedScore.takenAt,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting answers", error: error.message });
  }
};
