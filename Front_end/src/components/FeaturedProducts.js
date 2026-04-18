import React from "react";

const products = [
  {
    emoji: "🍅",
    name: "Tomato",
    price: "20 Tk/kg",
    location: "Jessore",
    badge: "Fresh",
  },
  {
    emoji: "🥔",
    name: "Potato",
    price: "15 Tk/kg",
    location: "Rangpur",
    badge: null,
  },
  {
    emoji: "🧅",
    name: "Onion",
    price: "25 Tk/kg",
    location: "Pabna",
    badge: "Popular",
  },
  {
    emoji: "🥦",
    name: "Cauliflower",
    price: "30 Tk/kg",
    location: "Bogura",
    badge: null,
  },
  {
    emoji: "🥕",
    name: "Carrot",
    price: "35 Tk/kg",
    location: "Dinajpur",
    badge: null,
  },
  {
    emoji: "🌾",
    name: "Rice (Aman)",
    price: "55 Tk/kg",
    location: "Sylhet",
    badge: "Seasonal",
  },
];

function FeaturedProducts() {
  return (
    <div style={{ padding: "40px 32px", background: "#fff" }}>
      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "12px",
          marginBottom: "36px",
        }}
      >
        {[
          { val: "1,240+", lbl: "Active farmers" },
          { val: "340+", lbl: "Products listed" },
          { val: "64", lbl: "Districts covered" },
        ].map((s) => (
          <div
            key={s.lbl}
            style={{
              background: "#f0faf4",
              borderRadius: "10px",
              padding: "14px 18px",
            }}
          >
            <div
              style={{ fontSize: "22px", fontWeight: "600", color: "#2f855a" }}
            >
              {s.val}
            </div>
            <div
              style={{ fontSize: "12px", color: "#718096", marginTop: "2px" }}
            >
              {s.lbl}
            </div>
          </div>
        ))}
      </div>

      <h2
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "22px",
          margin: "0 0 4px",
        }}
      >
        Featured products
      </h2>
      <p style={{ fontSize: "13px", color: "#718096", margin: "0 0 24px" }}>
        Fresh from farms across Bangladesh
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))",
          gap: "14px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.name}
            style={{
              background: "#f7fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "16px",
              position: "relative",
              cursor: "pointer",
            }}
          >
            {p.badge && (
              <span
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "#d1fae5",
                  color: "#166534",
                  fontSize: "11px",
                  padding: "2px 8px",
                  borderRadius: "10px",
                }}
              >
                {p.badge}
              </span>
            )}
            <div style={{ fontSize: "28px", marginBottom: "10px" }}>
              {p.emoji}
            </div>
            <h3
              style={{ fontSize: "15px", fontWeight: "500", margin: "0 0 4px" }}
            >
              {p.name}
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "#276749",
                fontWeight: "500",
                margin: "0 0 4px",
              }}
            >
              {p.price}
            </p>
            <p style={{ fontSize: "12px", color: "#718096", margin: 0 }}>
              {p.location}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
