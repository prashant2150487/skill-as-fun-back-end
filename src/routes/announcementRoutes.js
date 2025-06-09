import express from "express";
import {
  createAnnouncement,
  deleteAnnouncement,
  getActiveAnnouncementForClient,
  getAllAnnouncementForAdmin,
  updateAnnouncement,
} from "../controllers/announcementController.js";
const router = express.Router();

router.post("/", createAnnouncement);
router.get("/active", getActiveAnnouncementForClient);
router.get("/all", getAllAnnouncementForAdmin);
router.put("/:id", updateAnnouncement);
router.delete("/:id", deleteAnnouncement);

export default router;
