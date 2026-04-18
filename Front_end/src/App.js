import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/farmer/dashboard"
          element={
            <div style={{ padding: "40px" }}>
              🌾 Farmer Dashboard — coming soon
            </div>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <div style={{ padding: "40px" }}>
              🛡️ Admin Dashboard — coming soon
            </div>
          }
        />
        <Route
          path="/custom-deal"
          element={
            <div style={{ padding: "40px" }}>🤝 Custom Deal — coming soon</div>
          }
        />
        <Route
          path="/cart"
          element={<div style={{ padding: "40px" }}>🛒 Cart — coming soon</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
