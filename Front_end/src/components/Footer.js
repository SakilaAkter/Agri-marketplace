import React from "react";

function Footer() {
  return (
    <footer
      style={{
        background: "#1a4731",
        padding: "28px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "Georgia, serif",
            color: "#a8e6c1",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          AgriMarket
        </div>
        <p style={{ color: "#86c9a3", fontSize: "13px", margin: "4px 0 0" }}>
          Connecting farmers to markets across Bangladesh
        </p>
        <p style={{ color: "#5a9e78", fontSize: "12px", margin: "4px 0 0" }}>
          © 2026 AgriMarket Platform
        </p>
      </div>
      <div style={{ display: "flex", gap: "20px" }}>
        {["About", "Products", "Farmers", "Contact"].map((link) => (
          <a
            key={link}
            href="/"
            style={{
              color: "#86c9a3",
              fontSize: "13px",
              textDecoration: "none",
            }}
          >
            {link}
          </a>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
