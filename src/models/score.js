import mongoose from "mongoose";
const ScoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  takenAt: { type: Date, default: Date.now },
});
export default mongoose.model("Score", ScoreSchema);
