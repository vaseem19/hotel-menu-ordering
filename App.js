import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OrderPage from "./pages/OrderPage";
import Login from "./pages/Login";
import OrderHistory from "./pages/OrderHistory";
import AdminOrders from "./pages/AdminOrders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/history" element={<OrderHistory />} />
        <Route path="/admin" element={<AdminOrders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
