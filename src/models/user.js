import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  childName: {
    type: String,
    required: true,
  },
  guardianName: {
    type: String,
    required: true,
  },
  whatsUpNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.model("User", userSchema);
