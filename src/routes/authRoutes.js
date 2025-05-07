import express from "express";
import {
  deleteUser,
  getAllUsers,
  getMe,
  login,
  signup,
  updateUser,
} from "../controllers/authController.js";
import authenticateToken from "../middleware/authMiddleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getAllUsers", authenticateToken, getAllUsers);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", authenticateToken, deleteUser);
router.get("/meta/user", authenticateToken, getMe);

export default router;
