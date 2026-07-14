import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout.js";
import Payment from "./pages/Payment";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Predictor from "./pages/Predictor.js";

import FarmerDashboard from "./pages/FarmerDashboard";
import CreateProduct from "./pages/CreateProduct";
import ManageProducts from "./pages/ManageProducts";
import ViewOrder from "./pages/ViewOrder";
import Cart from "./pages/Cart";
import CustomDeal from "./pages/CustomDeal";
import Report from "./pages/Report";

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
        <Route path="/admin" element={<Admin />} />
        <Route path="/predictor" element={<Predictor />} />
        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
        <Route path="/farmer/products/new" element={<CreateProduct />} />

        <Route path="/farmer/products" element={<ManageProducts />} />
        <Route path="/farmer/orders" element={<ViewOrder />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/custom-deal" element={<CustomDeal />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
