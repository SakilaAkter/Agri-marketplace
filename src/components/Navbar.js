import React from "react";

function Navbar() {
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
        style={{
          margin: 0,
          fontFamily: "Georgia, serif",
          color: "#a8e6c1",
          fontSize: "22px",
        }}
      >
        AgriMarket
      </h2>
      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
        {["Home", "Products", "Farmers"].map((link) => (
          <a
            key={link}
            href="/"
            style={{
              color: "#c8f0d8",
              fontSize: "13px",
              padding: "6px 14px",
              borderRadius: "20px",
              textDecoration: "none",
            }}
          >
            {link}
          </a>
        ))}
        <a
          href="/"
          style={{
            color: "#c8f0d8",
            fontSize: "13px",
            padding: "6px 14px",
            borderRadius: "20px",
            textDecoration: "none",
          }}
        >
          Login
        </a>
        <a
          href="/"
          style={{
            background: "#38a169",
            color: "white",
            fontSize: "13px",
            padding: "7px 16px",
            borderRadius: "20px",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Register
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
