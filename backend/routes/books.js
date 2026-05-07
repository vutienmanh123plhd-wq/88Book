import express from "express";
import { authenticateToken, authorizeRole } from "../middleware/auth.js";
import {
  getAllBooks,
  getStaffPicks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

const router = express.Router();

// Public routes
router.get("/", getAllBooks);
router.get("/staff-picks", getStaffPicks);
router.get("/:id", getBookById);

// Protected routes (admins and staff)
router.post("/", authenticateToken, authorizeRole("admin", "staff"), createBook);
router.put("/:id", authenticateToken, authorizeRole("admin", "staff"), updateBook);
router.delete("/:id", authenticateToken, authorizeRole("admin", "staff"), deleteBook);

export default router;
