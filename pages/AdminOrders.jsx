import { useState, useEffect } from "react";
import API from "../api/axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  // Load all orders on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await API.get("/orders"); // Assuming this returns all orders
      setOrders(response.data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load orders.");
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await API.put(`/orders/${orderId}/status`, { status: newStatus });
      setMessage("Order status updated");
      // Update the order in local state
      setOrders(orders.map(o => (o._id === orderId ? response.data.order : o)));
    } catch (err) {
      console.error(err);
      setMessage("Failed to update order status");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin - Orders</h1>

      {message && <p>{message}</p>}

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map((order) => (
        <div key={order._id} style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px" }}>
          <p><strong>Name:</strong> {order.customerName}</p>
          <p><strong>Table:</strong> {order.tableNumber}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> ₹{order.totalAmount}</p>
          <div>
            <button onClick={() => updateStatus(order._id, "Pending")}>Pending</button>
            <button onClick={() => updateStatus(order._id, "Preparing")}>Preparing</button>
            <button onClick={() => updateStatus(order._id, "Completed")}>Completed</button>
          </div>
        </div>
      ))}
    </div>
  );
}
