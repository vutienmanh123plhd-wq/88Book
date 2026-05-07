import express from "express";
import { authenticateToken, authorizeRole } from "../middleware/auth.js";
import {
  getAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
  updateUserRole,
  getAdminBooks,
  getAdminOrders,
  updateOrderStatus,
  getAdminStats,
} from "../controllers/adminController.js";

const router = express.Router();

router.use(authenticateToken, authorizeRole("admin"));

router.get("/users", getAdminUsers);
router.post("/users", createAdminUser);
router.put("/users/:userId", updateAdminUser);
router.delete("/users/:userId", deleteAdminUser);
router.put("/users/:userId/role", updateUserRole);
router.get("/books", getAdminBooks);
router.get("/orders", getAdminOrders);
router.get("/stats", getAdminStats);
router.put("/orders/:orderId/status", updateOrderStatus);

export default router;
