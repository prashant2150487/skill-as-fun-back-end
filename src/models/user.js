import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   childName: {
//     type: String,
//     required: true,
//   },
//   guardianName: {
//     type: String,
//     required: true,
//   },
//   whatsUpNo: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});



export default mongoose.model("User", UserSchema);
