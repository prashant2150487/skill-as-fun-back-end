import mongoose from "mongoose";
const QuestionSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  text: { type: String, required: true },
  options: { type: [String], length: 2, required: true },
  correctIndex: { type: Number, enum: [0, 1], required: true },
});
export default mongoose.model("Question", QuestionSchema);
