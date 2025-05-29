import { registerForBusiness } from "../controllers/businessController.js";
import express from "express";

const router = express.Router();
router.post("/businessInfo", registerForBusiness);
export default router;
