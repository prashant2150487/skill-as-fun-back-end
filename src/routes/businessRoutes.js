import {
  getDemo,
  registerForBusiness,
  registerForDemo,
} from "../controllers/businessController.js";
import express from "express";
import authenticateToken from "../middleware/authMiddleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware/adminOnly.js";

const router = express.Router();
router.post("/businessInfo", registerForBusiness);
router.post("/demo", registerForDemo);
router.get("/demo", authenticateToken, adminOnly, getDemo);

export default router;
