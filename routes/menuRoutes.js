import express from "express";
import {
  addMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem
} from "../controllers/menuController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected route (admin)
router.post("/create", protect, addMenuItem);
router.put("/:id", protect, updateMenuItem);
router.delete("/:id", protect, deleteMenuItem);

// Public route
router.get("/", getMenuItems);

export default router;
