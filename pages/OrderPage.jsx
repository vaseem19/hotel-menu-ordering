import { useState, useEffect } from "react";
import API from "../api/axios";

export default function OrderPage() {
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [message, setMessage] = useState("");

  // Load cart and user from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setCustomerName(user.name);
  }, []);

  const placeOrder = async () => {
    if (!customerName || !tableNumber) {
      setMessage("Please enter name and table number.");
      return;
    }

    if (cart.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }

    const orderPayload = {
      customerName,
      tableNumber: Number(tableNumber),
      items: cart.map(item => ({
        menuItem: item._id,
        quantity: item.quantity
      })),
      totalAmount: cart.reduce((sum, i) => sum + i.price * i.quantity, 0)
    };

    try {
      const res = await API.post("/orders/create", orderPayload);
      setMessage("✅ Order placed successfully!");
      setCart([]);
      localStorage.removeItem("cart"); // Clear saved cart
      console.log("Order response:", res.data);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Failed to place order");
      console.error(err);
    }
  };

  const totalAmount = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cart</h2>

      {cart.length === 0 && <p>No items in cart.</p>}

      {cart.map(item => (
        <div key={item._id}>
          {item.name} × {item.quantity} – ₹{item.price * item.quantity}
        </div>
      ))}

      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Table Number"
        value={tableNumber}
        onChange={(e) => setTableNumber(e.target.value)}
      />

      {cart.length > 0 && (
        <div>
          <p>Total: ₹{totalAmount}</p>
          <button onClick={placeOrder}>Place Order</button>
        </div>
      )}

      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
}
