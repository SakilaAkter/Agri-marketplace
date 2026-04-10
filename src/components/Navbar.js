import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 32px",
        background: "#1a4731",
        color: "white",
      }}
    >
      <h2
        onClick={() => navigate("/")}
        style={{
          margin: 0,
          fontFamily: "Georgia, serif",
          color: "#a8e6c1",
          fontSize: "22px",
          cursor: "pointer",
        }}
      >
        AgriMarket
      </h2>

      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
        <span
          onClick={() => navigate("/")}
          style={{
            color: "#c8f0d8",
            fontSize: "13px",
            padding: "6px 14px",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          Home
        </span>

        <span
          onClick={() => navigate("/products")}
          style={{
            color: "#c8f0d8",
            fontSize: "13px",
            padding: "6px 14px",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          Products
        </span>

        <span
          onClick={() => navigate("/farmers")}
          style={{
            color: "#c8f0d8",
            fontSize: "13px",
            padding: "6px 14px",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          Farmers
        </span>

        <span
          onClick={() => navigate("/login")}
          style={{
            color: "#c8f0d8",
            fontSize: "13px",
            padding: "6px 14px",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          Login
        </span>

        <span
          onClick={() => navigate("/register")}
          style={{
            background: "#38a169",
            color: "white",
            fontSize: "13px",
            padding: "7px 16px",
            borderRadius: "20px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Register
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
