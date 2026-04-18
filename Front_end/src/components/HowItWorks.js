import React from "react";

const steps = [
  {
    num: "01",
    title: "Farmers list products",
    text: "Farmers upload crops with price, quantity, and location to the marketplace.",
  },
  {
    num: "02",
    title: "Buyers place orders",
    text: "Restaurants and grocery shops browse and order directly from verified farmers.",
  },
  {
    num: "03",
    title: "Fast delivery",
    text: "Products are delivered straight from farms — fresher produce, fairer prices.",
  },
];

function HowItWorks() {
  return (
    <div style={{ background: "#f0faf4", padding: "48px 32px" }}>
      <h2
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "22px",
          margin: "0 0 4px",
        }}
      >
        How it works
      </h2>
      <p style={{ fontSize: "13px", color: "#718096", margin: "0 0 28px" }}>
        Three simple steps from farm to table
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
          gap: "16px",
        }}
      >
        {steps.map((s) => (
          <div
            key={s.num}
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "24px",
            }}
          >
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "30px",
                color: "#2f855a",
                fontWeight: "600",
                marginBottom: "10px",
              }}
            >
              {s.num}
            </div>
            <h4
              style={{ fontSize: "14px", fontWeight: "500", margin: "0 0 8px" }}
            >
              {s.title}
            </h4>
            <p
              style={{
                fontSize: "13px",
                color: "#718096",
                margin: 0,
                lineHeight: "1.6",
              }}
            >
              {s.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HowItWorks;
