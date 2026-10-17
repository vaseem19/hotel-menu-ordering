import express from "express";
import {
  placeOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder
} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create an order (customer)
router.post("/create", protect, placeOrder);

// Update order status (admin)
router.put("/:id/status", protect, updateOrderStatus);

// Delete order
router.delete("/:id", protect, deleteOrder);

// Get all orders (public or admin)
router.get("/", getOrders);

export default router;
