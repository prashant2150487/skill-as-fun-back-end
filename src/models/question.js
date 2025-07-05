import mongoose from "mongoose";
const QuestionSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  text: { type: String, required: true },
  options: {
    type: [String],
    length: 4,
    validate: (v) => v.length === 4,
    required: true,
  },
  correctIndex: { type: Number, enum: [1, 2, 3, 4], required: true },
});
export default mongoose.model("Question", QuestionSchema);
