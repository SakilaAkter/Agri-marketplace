import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FALLBACK =
  "https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?w=400&h=300&fit=crop";


function FeaturedProducts() {

  const navigate = useNavigate();
  const [cnt, setCnt] = useState({
    userCount: 0,
    productCount: 0,
  });

  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    const fetchCnt = async () => {
      try {
        const res = await fetch("http://localhost:3000/hero");
        const data = await res.json();
        setCnt(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCnt();
  }, []);

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
          { val: cnt.userCount, lbl: "Active farmers" },
          { val: cnt.productCount, lbl: "Products listed" },
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
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "14px",
        }}
      >
        {products.slice(0, 6).map((p) => (
          <div
            key={p.name}
            onClick={() => navigate("/products")}
            style={{
              background: "#f7fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "16px",
              position: "relative",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
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
                  borderRadius: "8px",
                }}
              >
                {p.badge}
              </span>
            )}

            <div
              style={{
                width: "70%",
                aspectRatio: "1 / 1",
                overflow: "hidden",
                borderRadius: "8px",
                marginBottom: "8px",
                background: "#fff",
              }}
            >
              <img
                src={p.img}
                alt={p.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK;
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <h3
              style={{
                fontSize: "15px",
                fontWeight: "500",
                margin: "0 0 4px",
              }}
            >
              {p.name}
            </h3>

            <p
              style={{
                fontSize: "15px",
                color: "#276749",
                fontWeight: "600",
                margin: "0 0 6px",
              }}
            >
              {p.price}
            </p>

            <p
              style={{
                fontSize: "13px",
                color: "#718096",
                margin: 0,
              }}
            >
              {p.location}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
