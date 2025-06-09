import mongoose from "mongoose";

const announcementSchema = new mongoose.schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    targetAudience: {
      title: String,
      enum: ["all", "students", "teachers", "parents"],
      default: ["all"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Announcement", announcementSchema);
