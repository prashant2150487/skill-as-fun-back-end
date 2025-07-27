import mongoose from "mongoose";

const demoSchema = new mongoose.Schema(
  {
    childName: {
      type: String,
      required: [true, "Child's name is required"],
      trim: true,
    },
    guardianName: {
      type: String,
      required: [true, "Guardian's name is required"],
      trim: true,
    },
    whatsAppNumber: {
      type: String,
      required: [true, "WhatsApp number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Demo = mongoose.model("Demo", demoSchema);

export default Demo;