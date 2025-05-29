import mongoose from "mongoose";

const businessRegSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [2, "First name must be at least 2 characters long"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [2, "Last name must be at least 2 characters long"],
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
    organization: {
      type: String,
      required: [true, "Organization name is required"],
      minlength: [2, "Organization name must be at least 2 characters"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      minlength: [10, "Message must be at least 10 characters long"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Business = mongoose.model("Business", businessRegSchema);

export default Business;
