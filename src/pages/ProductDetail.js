import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const products = [
  {
    id: 1,
    name: "Fresh Tomato",
    price: 20,
    unit: "kg",
    location: "Jessore",
    farmer: "Rahim Farm",
    farmerInitials: "RF",
    category: "Vegetables",
    badge: "Fresh",
    trend: "up",
    trendPct: "+12%",
    aiHint: "Price rising due to low supply this week — buy now.",
    stock: 240,
    minOrder: 5,
    discount: "5% off 50kg+",
    listed: "Jan 10, 2026",
    desc: "Farm-fresh tomatoes grown organically in Jessore. Harvested daily and delivered directly to buyers. No pesticides used.",
    img: "https://images.unsplash.com/photo-1561136594-7f68413baa99?w=600&q=80",
  },
  {
    id: 2,
    name: "Potato",
    price: 15,
    unit: "kg",
    location: "Rangpur",
    farmer: "Karim Farm",
    farmerInitials: "KF",
    category: "Vegetables",
    badge: null,
    trend: "down",
    trendPct: "-8%",
    aiHint: "Price dropping — good time to stock up in bulk.",
    stock: 500,
    minOrder: 10,
    discount: "None",
    listed: "Jan 8, 2026",
    desc: "High quality potatoes from Rangpur. Ideal for restaurants and grocery shops. Freshly dug and cleaned.",
    img: "https://images.unsplash.com/photo-1508313880080-c4bef0730395?w=600&q=80",
  },
  {
    id: 3,
    name: "Onion",
    price: 25,
    unit: "kg",
    location: "Pabna",
    farmer: "Hasan Farm",
    farmerInitials: "HF",
    category: "Vegetables",
    badge: "Popular",
    trend: "stable",
    trendPct: "0%",
    aiHint: "Price has been stable for 2 weeks.",
    stock: 180,
    minOrder: 5,
    discount: "10% off 100kg+",
    listed: "Jan 5, 2026",
    desc: "Fresh onions from Pabna. Our most popular product with consistent quality year-round.",
    img: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&q=80",
  },
  {
    id: 4,
    name: "Cauliflower",
    price: 30,
    unit: "kg",
    location: "Bogura",
    farmer: "Salam Farm",
    farmerInitials: "SF",
    category: "Vegetables",
    badge: "Fresh",
    trend: "up",
    trendPct: "+18%",
    aiHint: "Seasonal demand rising — price may go up further.",
    stock: 80,
    minOrder: 3,
    discount: "None",
    listed: "Jan 9, 2026",
    desc: "Fresh cauliflower picked this morning from Bogura farms. Perfect for restaurants and bulk buyers.",
    img: "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?w=600&q=80",
  },
  {
    id: 5,
    name: "Carrot",
    price: 35,
    unit: "kg",
    location: "Dinajpur",
    farmer: "Ali Farm",
    farmerInitials: "AF",
    category: "Vegetables",
    badge: null,
    trend: "stable",
    trendPct: "0%",
    aiHint: "Steady supply from Dinajpur keeps price consistent.",
    stock: 120,
    minOrder: 5,
    discount: "None",
    listed: "Jan 7, 2026",
    desc: "Sweet crunchy carrots from Dinajpur. Great for bulk buyers, restaurants, and juice bars.",
    img: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=600&q=80",
  },
  {
    id: 6,
    name: "Rice (Aman)",
    price: 55,
    unit: "kg",
    location: "Sylhet",
    farmer: "Mia Farm",
    farmerInitials: "MF",
    category: "Grains",
    badge: "Seasonal",
    trend: "up",
    trendPct: "+22%",
    aiHint: "Post-harvest price rising fast — secure stock now.",
    stock: 1000,
    minOrder: 20,
    discount: "3% off 200kg+",
    listed: "Dec 20, 2025",
    desc: "Premium Aman rice from Sylhet. Seasonal harvest with limited stock. Aromatic and high quality.",
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=75",
  },
  {
    id: 7,
    name: "Green Pepper",
    price: 40,
    unit: "kg",
    location: "Khulna",
    farmer: "Alam Farm",
    farmerInitials: "ALF",
    category: "Vegetables",
    badge: "Fresh",
    trend: "down",
    trendPct: "-5%",
    aiHint: "Bumper harvest in Khulna pushing prices down.",
    stock: 90,
    minOrder: 3,
    discount: "None",
    listed: "Jan 9, 2026",
    desc: "Fresh green peppers from Khulna. Crisp and flavorful, ideal for salads and cooking.",
    img: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&q=75",
  },
  {
    id: 8,
    name: "Garlic",
    price: 80,
    unit: "kg",
    location: "Rajshahi",
    farmer: "Islam Farm",
    farmerInitials: "IF",
    category: "Spices",
    badge: null,
    trend: "up",
    trendPct: "+15%",
    aiHint: "Import restrictions raising garlic prices nationwide.",
    stock: 60,
    minOrder: 2,
    discount: "None",
    listed: "Jan 6, 2026",
    desc: "Premium quality garlic from Rajshahi. Strong aroma and flavor. Dry-cured for longer shelf life.",
    img: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=600&q=80",
  },
  {
    id: 9,
    name: "Brinjal",
    price: 18,
    unit: "kg",
    location: "Jessore",
    farmer: "Dewan Farm",
    farmerInitials: "DF",
    category: "Vegetables",
    badge: "Fresh",
    trend: "stable",
    trendPct: "0%",
    aiHint: "Consistent supply — price expected to hold.",
    stock: 150,
    minOrder: 5,
    discount: "None",
    listed: "Jan 10, 2026",
    desc: "Fresh brinjal picked daily from Jessore farms. Deep purple, firm and fresh.",
    img: "https://images.pexels.com/photos/321551/pexels-photo-321551.jpeg?w=400&h=300&fit=crop",
  },
  {
    id: 10,
    name: "Orange",
    price: 60,
    unit: "kg",
    location: "Khulna",
    farmer: "Haque Farm",
    farmerInitials: "HQF",
    category: "Fruits",
    badge: null,
    trend: "down",
    trendPct: "-10%",
    aiHint:
      "New harvest season dropping orange prices — good time to buy in bulk.",
    stock: 200,
    minOrder: 5,
    discount: "None",
    listed: "Jan 8, 2026",
    desc: "Sweet and juicy oranges from Khulna. High vitamin C content. Perfect for restaurants, juice producers and grocery shops.",
    img: "https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?w=600&h=400&fit=crop",
  },
  {
    id: 11,
    name: "Red Chilli",
    price: 90,
    unit: "kg",
    location: "Bogura",
    farmer: "Reza Farm",
    farmerInitials: "RF2",
    category: "Spices",
    badge: "Seasonal",
    trend: "up",
    trendPct: "+20%",
    aiHint: "Dry weather reducing yields — prices expected to climb.",
    stock: 45,
    minOrder: 2,
    discount: "None",
    listed: "Jan 4, 2026",
    desc: "Fiery red chillies from Bogura. Sun-dried and packed fresh. High heat level.",
    img: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&q=80",
  },
  {
    id: 12,
    name: "Spinach",
    price: 12,
    unit: "kg",
    location: "Dhaka",
    farmer: "Noor Farm",
    farmerInitials: "NF",
    category: "Vegetables",
    badge: "Fresh",
    trend: "down",
    trendPct: "-15%",
    aiHint: "Oversupply near Dhaka — best price right now.",
    stock: 300,
    minOrder: 3,
    discount: "None",
    listed: "Jan 10, 2026",
    desc: "Tender fresh spinach leaves from Dhaka district. Washed and packed. Ready to cook.",
    img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=75",
  },
];

const FALLBACK =
  "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80";

const badgeStyle = {
  Fresh: { background: "#d1fae5", color: "#065f46" },
  Popular: { background: "#fef3c7", color: "#92400e" },
  Seasonal: { background: "#ede9fe", color: "#4c1d95" },
};

const trendStyle = {
  up: { background: "#fee2e2", color: "#991b1b" },
  down: { background: "#d1fae5", color: "#065f46" },
  stable: { background: "#f1f5f9", color: "#334155" },
};

const trendLabel = { up: "↑ Rising", down: "↓ Falling", stable: "→ Stable" };

const hintStyle = {
  up: {
    background: "#fef2f2",
    color: "#991b1b",
    border: "0.5px solid #fecaca",
  },
  down: {
    background: "#f0fdf4",
    color: "#166534",
    border: "0.5px solid #bbf7d0",
  },
  stable: {
    background: "#f8fafc",
    color: "#475569",
    border: "0.5px solid #e2e8f0",
  },
};

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id)) || products[0];

  const [qty, setQty] = useState(product.minOrder);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exists = cart.find((i) => i.id === product.id);
    if (exists) exists.qty += qty;
    else cart.push({ ...product, qty });
    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const box = (label, value) => (
    <div
      style={{
        background: "#fff",
        border: "0.5px solid #e2e8f0",
        borderRadius: "10px",
        padding: "10px 12px",
      }}
    >
      <div
        style={{
          fontSize: "10px",
          color: "#718096",
          marginBottom: "3px",
          textTransform: "uppercase",
          letterSpacing: "0.4px",
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: "13px", fontWeight: "500" }}>{value}</div>
    </div>
  );

  return (
    <div style={{ background: "#f7faf8", minHeight: "100vh" }}>
      <Navbar />

      {/* Breadcrumb */}
      <div
        style={{
          padding: "10px 28px",
          fontSize: "12px",
          color: "#718096",
          background: "#fff",
          borderBottom: "0.5px solid #e2e8f0",
        }}
      >
        <span
          onClick={() => navigate("/")}
          style={{ color: "#2f855a", cursor: "pointer" }}
        >
          Home
        </span>
        {" / "}
        <span
          onClick={() => navigate("/products")}
          style={{ color: "#2f855a", cursor: "pointer" }}
        >
          Products
        </span>
        {" / "}
        {product.name}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "28px",
          padding: "28px",
          maxWidth: "960px",
        }}
      >
        {/* LEFT — Single image + AI card */}
        <div>
          {/* Single product image */}
          <div
            style={{
              borderRadius: "14px",
              overflow: "hidden",
              border: "0.5px solid #e2e8f0",
              height: "320px",
              background: "#fff",
              marginBottom: "14px",
              position: "relative",
            }}
          >
            <img
              src={product.img}
              alt={product.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = FALLBACK;
              }}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* Trend badge on image */}
            <span
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                fontSize: "11px",
                padding: "4px 10px",
                borderRadius: "8px",
                fontWeight: "500",
                ...trendStyle[product.trend],
              }}
            >
              {trendLabel[product.trend]} {product.trendPct}
            </span>
            {/* Freshness badge on image */}
            {product.badge && (
              <span
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  fontSize: "11px",
                  padding: "4px 10px",
                  borderRadius: "8px",
                  fontWeight: "500",
                  ...badgeStyle[product.badge],
                }}
              >
                {product.badge}
              </span>
            )}
          </div>

          {/* AI analysis card */}
          <div
            style={{
              background: "#fff",
              border: "0.5px solid #e2e8f0",
              borderRadius: "12px",
              padding: "14px",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: "500",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              🤖 AI Price Trend Analysis
              <span
                style={{
                  fontSize: "10px",
                  padding: "2px 8px",
                  borderRadius: "8px",
                  fontWeight: "500",
                  ...trendStyle[product.trend],
                }}
              >
                {trendLabel[product.trend]} {product.trendPct}
              </span>
            </div>
            <div
              style={{
                fontSize: "12px",
                padding: "8px 10px",
                borderRadius: "8px",
                lineHeight: "1.6",
                ...hintStyle[product.trend],
              }}
            >
              {product.aiHint}
            </div>

            {/* Price bar chart */}
            <div style={{ marginTop: "12px" }}>
              <div
                style={{
                  fontSize: "10px",
                  color: "#718096",
                  marginBottom: "6px",
                }}
              >
                Last 7 days price trend
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "4px",
                  height: "40px",
                }}
              >
                {[65, 70, 68, 72, 75, 80, product.price].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      borderRadius: "3px 3px 0 0",
                      height: `${(h / 100) * 40}px`,
                      background: i === 6 ? "#2f855a" : "#e2e8f0",
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "9px",
                  color: "#718096",
                  marginTop: "3px",
                }}
              >
                <span>7d ago</span>
                <span>Today</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* Badges */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {product.badge && (
              <span
                style={{
                  fontSize: "11px",
                  padding: "3px 10px",
                  borderRadius: "10px",
                  ...badgeStyle[product.badge],
                }}
              >
                {product.badge}
              </span>
            )}
            <span
              style={{
                fontSize: "11px",
                padding: "3px 10px",
                borderRadius: "10px",
                background: "#dbeafe",
                color: "#1e40af",
              }}
            >
              per {product.unit}
            </span>
            <span
              style={{
                fontSize: "11px",
                padding: "3px 10px",
                borderRadius: "10px",
                background: "#ede9fe",
                color: "#4c1d95",
              }}
            >
              {product.category}
            </span>
          </div>

          {/* Name */}
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "26px",
              fontWeight: "600",
              lineHeight: "1.2",
            }}
          >
            {product.name}
          </div>

          {/* Price */}
          <div
            style={{ fontSize: "30px", color: "#166534", fontWeight: "500" }}
          >
            {product.price} Tk
            <span
              style={{ fontSize: "14px", color: "#718096", fontWeight: "400" }}
            >
              {" "}
              / {product.unit}
            </span>
          </div>

          {/* Description */}
          <div
            style={{ fontSize: "13px", color: "#718096", lineHeight: "1.7" }}
          >
            {product.desc}
          </div>

          {/* Quantity */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "13px", color: "#718096" }}>
              Quantity ({product.unit})
            </span>
            <button
              onClick={() => setQty((q) => Math.max(product.minOrder, q - 1))}
              style={{
                width: "32px",
                height: "32px",
                border: "0.5px solid #cbd5e0",
                borderRadius: "8px",
                background: "#fff",
                fontSize: "18px",
                cursor: "pointer",
                outline: "none",
              }}
            >
              −
            </button>
            <span
              style={{
                fontSize: "16px",
                fontWeight: "500",
                minWidth: "28px",
                textAlign: "center",
              }}
            >
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => q + 1)}
              style={{
                width: "32px",
                height: "32px",
                border: "0.5px solid #cbd5e0",
                borderRadius: "8px",
                background: "#fff",
                fontSize: "18px",
                cursor: "pointer",
                outline: "none",
              }}
            >
              +
            </button>
            <span style={{ fontSize: "11px", color: "#718096" }}>
              min. {product.minOrder} {product.unit}
            </span>
          </div>

          {/* Total */}
          <div style={{ fontSize: "13px", color: "#718096" }}>
            Total:{" "}
            <strong style={{ color: "#166534", fontSize: "16px" }}>
              {qty * product.price} Tk
            </strong>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={handleAddToCart}
              style={{
                padding: "12px 24px",
                background: added ? "#276749" : "#2f855a",
                color: "#fff",
                border: "none",
                borderRadius: "24px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              {added ? "Added to cart ✓" : "Add to cart"}
            </button>
            <button
              onClick={() => navigate("/custom-deal")}
              style={{
                padding: "12px 24px",
                background: "transparent",
                color: "#2f855a",
                border: "1.5px solid #2f855a",
                borderRadius: "24px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Request custom deal
            </button>
          </div>

          {/* Farmer card */}
          <div
            style={{
              background: "#f0faf4",
              border: "0.5px solid #86efac",
              borderRadius: "12px",
              padding: "14px",
              display: "flex",
              gap: "12px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "#1a4731",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: "500",
                color: "#a8e6c1",
                flexShrink: 0,
              }}
            >
              {product.farmerInitials}
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: "500" }}>
                {product.farmer}
              </div>
              <div style={{ fontSize: "12px", color: "#718096" }}>
                {product.location}, Bangladesh · Member since 2023
              </div>
              <div
                style={{ fontSize: "11px", color: "#2f855a", marginTop: "2px" }}
              >
                ✓ Verified farmer
              </div>
            </div>
          </div>

          {/* Detail grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
            }}
          >
            {box("Available stock", `${product.stock} ${product.unit}`)}
            {box("Min. order", `${product.minOrder} ${product.unit}`)}
            {box("Discount", product.discount)}
            {box("Listed on", product.listed)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
