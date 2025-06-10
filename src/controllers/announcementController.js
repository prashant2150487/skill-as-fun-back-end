import Announcement from "../models/announcementBar.js";

export const createAnnouncement = async (req, res) => {
  try {
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
      // author: req.user.id,
    });
    const announcement = await newAnnouncement.save();
    res.status(201).json({
      message: "Announcement created successfully",
      announcement,
    });
    console.log(title, content, targetAudience, startDate, endDate);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating announcement",
      error: error.message,
    });
  }
};
export const getAllAnnouncementForAdmin = async (req, res) => {};
export const getActiveAnnouncementForClient = async (req, res) => {};
export const updateAnnouncement = async (req, res) => {};
export const deleteAnnouncement = async (req, res) => {};
