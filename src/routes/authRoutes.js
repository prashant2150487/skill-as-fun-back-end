import express from "express";
import {
  getAllUsers,
  login,
  signup,
  updateUser,
} from "../controllers/authController.js";
import authenticateToken from "../middleware/authMiddleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getAllUsers", getAllUsers);
router.put("/updateUser/:id", updateUser);

export default router;
