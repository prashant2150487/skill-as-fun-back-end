import Quiz from "../models/quiz.js";

// Create a new quiz
export const createQuiz = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newQuiz = await Quiz.create({ title, description, questions: [] });
    console.log(newQuiz);

    res.status(201).json({
      message: "Quiz created successfully",
      quiz: {
        id: newQuiz._id,
        title: newQuiz.title,
        description: newQuiz.description,
        questions: newQuiz.questions,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating quiz", error: error.message });
  }
};

// Add a question to a quiz
export const addQuestion = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const { text, options, correctIndex } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    const question = {
      text,
      options,
      correctIndex,
    };
    quiz.questions.push(question);
    await quiz.save();
    const addedQuestion = quiz.questions[quiz.questions.length - 1];
    res.status(201).json({
      message: "Question added successfully",
      question: {
        id: addedQuestion._id,
        text: addedQuestion.text,
        options: addedQuestion.options,
        correctIndex: addedQuestion.correctIndex,
      },
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
    const savesScore= await score.create({
        quizId,
        userId,
        score,
        totalQuestions: quiz.questions.length,
      
    })
    res.status(200).json({
      message: "Answers submitted successfully",
        score: {
            userId,
            quizId,
            score,
            totalQuestions: quiz.questions.length,
            takenAt: savedScore.takenAt
        },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting answers", error: error.message });
  }
};
