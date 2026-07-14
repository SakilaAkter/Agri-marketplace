import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function ManageProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("farmerProducts") || "[]");
    setProducts(stored);
  }, []);

  const handleRemove = (id) => {
    const updated = products.filter((product) => product.id !== id);
    setProducts(updated);
    localStorage.setItem("farmerProducts", JSON.stringify(updated));
  };

  return (
    <div style={{ background: "#f7faf8", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: "24px", maxWidth: "980px", margin: "0 auto" }}>
        <div style={{ marginBottom: "22px" }}>
          <h1 style={{ margin: 0, fontSize: "28px", color: "#1a202c" }}>
            Manage Products
          </h1>
          <div style={{ color: "#4a5568", marginTop: "8px" }}>
            Edit or remove your farmer product listings.
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={() => navigate("/farmer/products/new")}
            style={{
              padding: "12px 18px",
              borderRadius: "12px",
              border: "none",
              background: "#2f855a",
              color: "white",
              cursor: "pointer",
            }}
          >
            Create new product
          </button>
        </div>

        {products.length === 0 ? (
          <div
            style={{
              padding: "28px",
              borderRadius: "16px",
              background: "white",
              border: "1px solid #e2e8f0",
            }}
          >
            <p style={{ margin: 0, color: "#4a5568" }}>
              No products found. Add a product on the create page.
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "18px" }}>
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  background: "white",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  padding: "20px",
                  display: "grid",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "#1a202c",
                      }}
                    >
                      {product.name}
                    </div>
                    <div style={{ color: "#718096", fontSize: "13px" }}>
                      {product.category} · {product.location}
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                  >
                    <button
                      onClick={() => navigate("/farmer/products/new")}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: "1px solid #cbd5e0",
                        background: "white",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemove(product.id)}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: "1px solid #fcbfbd",
                        background: "#fef2f2",
                        color: "#991b1b",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(120px, 1fr))",
                    gap: "12px",
                  }}
                >
                  <div style={{ color: "#4a5568" }}>
                    <div style={{ fontSize: "12px", marginBottom: "6px" }}>
                      Stock
                    </div>
                    <div style={{ fontWeight: "700" }}>{product.stock} kg</div>
                  </div>
                  <div style={{ color: "#4a5568" }}>
                    <div style={{ fontSize: "12px", marginBottom: "6px" }}>
                      Price
                    </div>
                    <div style={{ fontWeight: "700" }}>
                      {product.price} Tk/kg
                    </div>
                  </div>
                  <div style={{ color: "#4a5568" }}>
                    <div style={{ fontSize: "12px", marginBottom: "6px" }}>
                      Suggested
                    </div>
                    <div style={{ fontWeight: "700" }}>
                      {product.suggestedPrice}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageProducts;
