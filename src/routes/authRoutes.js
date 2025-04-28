import express from "express";
import { getAllUsers, login, signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getAllUsers", getAllUsers);

export default router;
