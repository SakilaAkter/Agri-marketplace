import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

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

  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/product");

        const data = await res.json();

        const formattedProducts = data.map((p) => ({
          ...p,
          farmerInitials: p.farmer
            ?.split(" ")
            .map((w) => w[0])
            .join(""),
          badge: null,
          trend: "stable",
          trendPct: "0%",
          aiHint: "No trend data yet",
          gallery: [p.img],
          desc: p.product_desc
        }));

        setProducts(formattedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const product = products.find((p) => p.id === Number(id));

  useEffect(() => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item) => item.id === product.id);

    const initialQty = existing?.qty ?? product.minOrder ?? 1;

    setQty(Number(initialQty)); 
  }, [product]);

    if (!product) {
      return (
        <div style={{ padding: "40px" }}>
          Loading product...
        </div>
      );
    }

   const step = Number(product?.minOrder ?? 1);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const step = Number(product.minOrder) || 1;
    const maxim = Number(product.stock);

    const exists = cart.find((i) => i.id === product.id);

    if (exists) {
      exists.qty = Number(exists.qty || 0) + (qty - Number(exists.qty || 0));
      if(exists.qty >= maxim) exists.qty = maxim; 
    } else {
      cart.push({ ...product, qty });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setQty(qty); 
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const threshold =
  product.discount_avail_if == null
    ? Infinity
    : Number(product.discount_avail_if);

  const discount = Number(product.discount) || 0;

  const total =
    qty >= threshold
      ? qty * (product.price - discount)
      : qty * product.price;

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
              onClick={() =>
                    setQty((q) => {
                      const current = Number(q);
                      const min = Number(product.minOrder);
                      return Math.max(min, current - step);
                    })
                  }
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
              onClick={() =>
                    setQty((q) => {
                      const current = Number(q);
                      const step = Number(product.minOrder);

                      if (isNaN(current) || isNaN(step)) return step || 1;

                      return current + step;
                    })
                  }
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
              {total} Tk
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
                {product.location}, Bangladesh · Member Since {product.userSince}        
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
            {box(
              "Discount",
              `${product.discount} TK per ${product.unit} for ${product.discount_avail_if} ${product.unit} or more`
            )}
            {box("Listed on", product.listed)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
