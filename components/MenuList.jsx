import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function MenuList({ cart, addToCart, decreaseQty }) {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("/menu");
        setMenu(res.data);
      } catch (err) {
        console.error("Failed to load menu", err);
      }
    };
    fetchMenu();
  }, []);

  return (
    <>
      {menu.map(item => {
        const cartItem = cart.find(c => c._id === item._id);
        return (
          <div key={item._id} className="bg-white rounded-lg shadow-md p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <p className="font-semibold mb-3">₹{item.price}</p>
            </div>
{!cartItem ? (
  <button onClick={() => addToCart(item)} style={{
      padding: "5px 15px",
      backgroundColor: "#1d4ed8",
      color: "white",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      marginTop: "5px"
  }}>
    Add to Cart
  </button>
) : (
  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "5px" }}>
    <button onClick={() => decreaseQty(item)} style={{
      padding: "5px 10px",
      backgroundColor: "#ef4444",
      color: "white",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer"
    }}>−</button>

    <span style={{ minWidth: "20px", textAlign: "center", fontWeight: "bold" }}>
      {cartItem.quantity}
    </span>

    <button onClick={() => addToCart(item)} style={{
      padding: "5px 10px",
      backgroundColor: "#10b981",
      color: "white",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer"
    }}>+</button>
  </div>
)}

          </div>
        );
      })}
    </>
  );
}
