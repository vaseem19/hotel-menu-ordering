import { useEffect, useState } from "react";
import API from "../api/axios";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders");
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Orders</h2>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((order) => (
        <div key={order._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <p><b>Name:</b> {order.customerName}</p>
          <p><b>Table:</b> {order.tableNumber}</p>
          <p><b>Status:</b> {order.status}</p>
          <p><b>Total:</b> ₹{order.totalAmount}</p>
        </div>
      ))}
    </div>
  );
}
