import express from "express";
import { authenticateToken, authorizeRole } from "../middleware/auth.js";
import {
  getAdminBooks,
  getAdminOrders,
  updateOrderStatus,
  getAdminStats,
} from "../controllers/adminController.js";

const router = express.Router();

router.use(authenticateToken, authorizeRole("admin"));

router.get("/books", getAdminBooks);
router.get("/orders", getAdminOrders);
router.get("/stats", getAdminStats);
router.put("/orders/:orderId/status", updateOrderStatus);

export default router;
