import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function ManageProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {fetchProducts();}, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/myproducts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setProducts(data);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm("Remove this product?")) return;
    try {
      const response = await fetch(
        `http://localhost:3000/expireproduct/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      setProducts((prev) =>
        prev.filter((p) => p.product_id !== id)
      );

    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
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
            Add or remove your farmer product listings.
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
                key={product.product_id}
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
                      {product.product_name}
                    </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                      marginTop: "6px",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ color: "#718096", fontSize: "13px" }}>
                      {product.M_name}
                    </span>

                    <span
                      style={{
                        padding: "3px 8px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        background:
                          product.status === "active"
                            ? "#dcfce7"
                            : "#fee2e2",
                        color:
                          product.status === "active"
                            ? "#166534"
                            : "#991b1b",
                      }}
                    >
                      {product.status}
                    </span>

                    <span
                      style={{
                        padding: "3px 8px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        background:
                          product.expired_on
                            ? "#fef3c7"
                            : "#dcfce7",
                        color:
                          product.expired_on
                            ? "#92400e"
                            : "#166534",
                      }}
                    >
                      {product.expired_on ? "Removed" : "Available"}
                    </span>
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
                      Add
                    </button>
                    <button
                      disabled={!!product.expired_on}
                      onClick={() => handleRemove(product.product_id)}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "10px",
                        border: "1px solid #fcbfbd",
                        background: product.expired_on
                          ? "#edf2f7"
                          : "#fef2f2",
                        color: product.expired_on
                          ? "#718096"
                          : "#991b1b",
                        cursor: product.expired_on
                          ? "not-allowed"
                          : "pointer",
                      }}
                    >
                      {product.expired_on ? "Removed" : "Remove"}
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
                    <div style={{ fontWeight: "700" }}>{product.quantity} {product.unit_name}</div>
                  </div>
                  <div style={{ color: "#4a5568" }}>
                    <div style={{ fontSize: "12px", marginBottom: "6px" }}>
                      Price
                    </div>
                    <div style={{ fontWeight: "700" }}>
                      ৳{product.price} / {product.unit_name}
                    </div>
                  </div>
                  <div style={{ color: "#4a5568" }}>
                    <div
                      style={{
                        fontSize: "12px",
                        marginBottom: "6px",
                      }}
                    >
                      Min Sell
                    </div>

                      {product.expired_on && (
                        <div
                          style={{
                            color: "#718096",
                            fontSize: "13px",
                            marginTop: "8px",
                          }}
                        >
                          Removed on{" "}
                          {new Date(product.expired_on).toLocaleString()}
                        </div>
                      )}

                    <div style={{ fontWeight: "700" }}>
                      {product.min_sell_amount} {product.unit_name}
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
