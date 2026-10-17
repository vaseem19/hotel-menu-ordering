export default function Cart({ cart, clearCart }) {
  if (cart.length === 0) 
    return <p className="text-gray-500">No items in cart</p>;

  return (
    <div className="space-y-3">
      {cart.map((item) => (
        <div key={item._id} className="flex justify-between items-center bg-gray-100 p-3 rounded shadow-sm">
          <span className="font-medium">{item.name} × {item.quantity}</span>
          <span className="font-semibold">₹{item.price * item.quantity}</span>
        </div>
      ))}
      <button
        onClick={clearCart}
        className="mt-3 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
      >
        Clear Cart
      </button>
    </div>
  );
}
