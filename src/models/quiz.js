import mongoose from "mongoose";
const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    category: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // ...timestamps for record keeping
  });
  export default mongoose.model("Quiz", QuizSchema);
  