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
import adminOnly from "../middleware/adminMiddleware/adminOnly.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getAllUsers", authenticateToken, adminOnly, getAllUsers);
router.put("/updateUser/:id", authenticateToken, adminOnly, updateUser);
router.delete(
  "/deleteUser/:id",
  authenticateToken,
  adminOnly,
  deleteUser
);
router.get("/meta/user", authenticateToken, getMe);

export default router;
