import {
  registerForBusiness,
  registerForDemo,
} from "../controllers/businessController.js";
import express from "express";

const router = express.Router();
router.post("/businessInfo", registerForBusiness);
router.post("/demo", registerForDemo);

export default router;
