import { useState, useEffect } from "react";
import MenuList from "../components/MenuList";
import Cart from "../components/Cart";

export default function Home() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const addToCart = (item) => {
    const existing = cart.find(i => i._id === item._id);
    const updatedCart = existing
      ? cart.map(i => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i)
      : [...cart, { ...item, quantity: 1 }];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQty = (item) => {
    const updatedCart = cart
      .map(i => i._id === item._id ? { ...i, quantity: i.quantity - 1 } : i)
      .filter(i => i.quantity > 0);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const totalAmount = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Menu</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <MenuList cart={cart} addToCart={addToCart} decreaseQty={decreaseQty} />
      </div>

      <div className="mt-10 bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Cart</h2>
        <Cart cart={cart} clearCart={clearCart} />
        {cart.length > 0 && (
          <p className="text-xl font-bold mt-4 text-right">Total: ₹{totalAmount}</p>
        )}
      </div>
    </div>
  );
}
