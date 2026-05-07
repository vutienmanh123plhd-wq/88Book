import express from "express";
import { authenticateToken, authorizeRole } from "../middleware/auth.js";
import {
  getAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
  updateUserRole,
  getAdminBooks,
  getRecommendations,
  updateRecommendations,
  getAdminOrders,
  updateOrderStatus,
  getAdminStats,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", authenticateToken, authorizeRole("admin"), getAdminUsers);
router.post("/users", authenticateToken, authorizeRole("admin"), createAdminUser);
router.put("/users/:userId", authenticateToken, authorizeRole("admin"), updateAdminUser);
router.delete("/users/:userId", authenticateToken, authorizeRole("admin"), deleteAdminUser);
router.put("/users/:userId/role", authenticateToken, authorizeRole("admin"), updateUserRole);

router.get("/books", authenticateToken, authorizeRole("admin"), getAdminBooks);
router.get("/recommendations", authenticateToken, authorizeRole("admin"), getRecommendations);
router.put("/recommendations", authenticateToken, authorizeRole("admin"), updateRecommendations);

router.get("/orders", authenticateToken, authorizeRole("admin"), getAdminOrders);
router.get("/stats", authenticateToken, authorizeRole("admin"), getAdminStats);
router.put("/orders/:orderId/status", authenticateToken, authorizeRole("admin"), updateOrderStatus);

export default router;
