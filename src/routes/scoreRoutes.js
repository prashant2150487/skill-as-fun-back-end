import express from "express";
import { getScores } from "../controllers/scoreController.js";

const router = express.Router();

router.get("/score", getScores);
export default router;

