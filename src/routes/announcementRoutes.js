import express from "express";
import {
  createAnnouncement,
  deleteAnnouncement,
  getActiveAnnouncementForClient,
  getAllAnnouncementForAdmin,
  updateAnnouncement,
} from "../controllers/announcementController.js";
import adminOnly from "../middleware/adminMiddleware/adminOnly.js";
import authenticateToken from "../middleware/authMiddleware/authMiddleware.js";
const router = express.Router();

router.post("/", authenticateToken, adminOnly, createAnnouncement);
router.get("/active", getActiveAnnouncementForClient);
router.get("/all", getAllAnnouncementForAdmin);
router.put("/:id", updateAnnouncement);
router.delete("/:id", deleteAnnouncement);

export default router;
