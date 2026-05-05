import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  getUserProfile,
  updateUserProfile,
  changePassword,
  getPublicProfile,
} from "../controllers/userController.js";

const router = express.Router();

// Protected routes (require authentication)
router.get("/profile", authenticateToken, getUserProfile);
router.put("/profile", authenticateToken, updateUserProfile);
router.put("/change-password", authenticateToken, changePassword);

// Public route to get user info
router.get("/public/:userId", getPublicProfile);

export default router;
