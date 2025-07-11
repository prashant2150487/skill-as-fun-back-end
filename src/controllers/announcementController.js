import mongoose from "mongoose";
import Announcement from "../models/announcementBar.js";

export const createAnnouncement = async (req, res) => {
  try {
    console.log(req.user.id, "ID-------");
    const { title, content, targetAudience, startDate, endDate } = req.body;
    //validation
    if (!title || !content || !targetAudience || !startDate || !endDate) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingAnnouncement = await Announcement.findOne({ title });
    if (existingAnnouncement) {
      return res.status(400).json({
        message: "Announcement with this title already exists",
      });
    }

    // Optional: Validate date format if needed
    const parsedStartDate = startDate ? new Date(startDate) : undefined;
    const parsedEndDate = endDate ? new Date(endDate) : undefined;

    const newAnnouncement = new Announcement({
      title: title.trim(),
      content: content.trim(),
      targetAudience,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      author: req.user.id,
    });
    const announcement = await newAnnouncement.save();
    res.status(201).json({
      message: "Announcement created successfully",
      announcement,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating announcement",
      error: error.message,
    });
  }
};
export const getAllAnnouncementForAdmin = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    if (!announcements || announcements.length === 0) {
      res.status(404).json({
        message: "no announcements found",
      });
    }
    res.status(200).json({
      message: "announcement fetched successfully",
      announcements,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching announcements",
      error: error?.message,
    });
  }
};
export const getActiveAnnouncementForClient = async (req, res) => {
  try {
    const now = new Date();
    const announcements = await Announcement.find({
      isActive: true,
      startDate: { $lte: now },
      $or: [{ endDate: { $exists: false } }, { endDate: { $gte: now } }],
    }).sort({ startDate: -1 });
    res.status(200).json({
      message: "announcement fetched successfully",
      announcements,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error fetching announcement",
      error: err?.message,
    });
  }
};
const isValidMongoId = (id) => mongoose.Types.ObjectId.isValid(id);
export const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    // Validate ID
    if (!id || !isValidMongoId(id)) {
      return res.status(400).json({
        message: "Invalid announcement ID",
      });
    }
    const announcement = await Announcement.findByIdAndUpdate(id);
    if (!announcement) {
      return res.status(404).json({
        message: "announcement not found",
      });
    }
    res.status(200).json({
      message: "announcement updated successfully",
      announcement,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error updating announcement",
      error: err?.message,
    });
  }
};
export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    // Validate ID
    if (!id || !isValidMongoId(id)) {
      return res.status(400).json({
        message: "Invalid announcement ID",
      });
    }
    const announcement = await Announcement.findByIdAndDelete(id);
    if (!announcement) {
      return res.status(404).json({
        message: "Announcement not found",
      });
    }
    res.status(200).json({
      message: "Announcement deleted successfully",
      data: { id },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error deleting announcement",
      error: err?.message,
    });
  }
};
