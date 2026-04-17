import React from "react";

import { useNavigate } from "react-router-dom";
function Hero() {
  const navigate = useNavigate();
  return (
    <div
      style={{ position: "relative", overflow: "hidden", minHeight: "420px" }}
    >
      {/* ── Background farmer photo ── */}
      <img
        src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1400&q=80"
        alt="Farmers in field"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      {/* ── Dark overlay so text stays readable ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(40, 33, 10, 0.37) 45%, rgba(10,40,20,0.35))",
        }}
      />

      {/* ── Content on top ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "80px 48px",
          maxWidth: "560px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: "#d1fae5",
            color: "#166534",
            fontSize: "12px",
            padding: "4px 12px",
            borderRadius: "20px",
            marginBottom: "18px",
            fontWeight: "500",
          }}
        >
          Bangladesh's Farm-to-Market Platform
        </span>

        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "36px",
            fontWeight: "600",
            color: "#ffffff",
            lineHeight: "1.25",
            margin: "0 0 16px",
          }}
        >
          Connect Farmers <br /> Directly to Markets
        </h1>

        <p
          style={{
            fontSize: "15px",
            color: "#c8f0d8",
            lineHeight: "1.7",
            margin: "0 0 28px",
          }}
        >
          A digital marketplace where farmers sell fresh produce directly to
          grocery stores and restaurants — cutting out the middleman.
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("/products")}
            style={{
              padding: "12px 28px",
              background: "#38a169",
              color: "white",
              border: "none",
              borderRadius: "24px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Explore Products
          </button>
          <button
            onClick={() => navigate("/register")}
            style={{
              padding: "12px 28px",
              background: "transparent",
              color: "white",
              border: "1.5px solid rgba(255,255,255,0.4)",
              borderRadius: "24px",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Join as Farmer
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
