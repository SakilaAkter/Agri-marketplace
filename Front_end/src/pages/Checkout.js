import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    const productFromState = location.state?.product;
    if (productFromState) {
      const hasItem = stored.some((item) => item.id === productFromState.id);
      const updated = hasItem
        ? stored.map((item) =>
            item.id === productFromState.id
              ? { ...item, qty: item.qty + 1 }
              : item,
          )
        : [...stored, { ...productFromState, qty: 1 }];
      localStorage.setItem("cart", JSON.stringify(updated));
      setCart(updated);
    } else {
      setCart(stored);
    }
    setLoading(false);
  }, [location.state]);

  const totalAmount = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.qty || 1),
    0,
  );

  const handlePayment = () => {
    navigate("/payment", { state: { amount: totalAmount, cart } });
  };

  if (loading) {
    return <div style={{ padding: "40px" }}>Loading checkout...</div>;
  }

  return (
    <div style={{ background: "#f7faf8", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: "24px", maxWidth: "980px", margin: "0 auto" }}>
        <div style={{ marginBottom: "22px" }}>
          <h1 style={{ margin: 0, fontSize: "28px", color: "#1a202c" }}>
            Checkout
          </h1>
          <div style={{ color: "#4a5568", marginTop: "8px" }}>
            Review your orders and proceed to payment.
          </div>
        </div>

        {cart.length === 0 ? (
          <div
            style={{
              padding: "28px",
              borderRadius: "16px",
              background: "white",
              border: "1px solid #e2e8f0",
            }}
          >
            <p style={{ margin: 0, color: "#4a5568" }}>
              Your checkout is empty. Add a product first or go back to
              shopping.
            </p>
            <button
              onClick={() => navigate("/products")}
              style={{
                marginTop: "18px",
                padding: "12px 18px",
                borderRadius: "12px",
                border: "none",
                background: "#2f855a",
                color: "white",
                cursor: "pointer",
              }}
            >
              Browse products
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "20px" }}>
            <div
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                padding: "18px",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "18px", color: "#1a202c" }}>
                Order summary
              </h2>
              <div style={{ marginTop: "18px", display: "grid", gap: "14px" }}>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      gap: "12px",
                      alignItems: "center",
                      padding: "14px 0",
                      borderBottom: "1px solid #edf2f7",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "600", color: "#2d3748" }}>
                        {item.name || item.product_name || item.product}
                      </div>
                      <div style={{ fontSize: "12px", color: "#718096" }}>
                        Qty: {item.qty}
                      </div>
                    </div>
                    <div style={{ fontWeight: "600", color: "#234e52" }}>
                      {Number(item.price || 0) * Number(item.qty || 1)} Tk
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                padding: "18px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#4a5568" }}>Subtotal</span>
                <span style={{ fontWeight: "600", color: "#1a202c" }}>
                  {totalAmount} Tk
                </span>
              </div>
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <button
                  onClick={() => navigate("/products")}
                  style={{
                    padding: "12px 18px",
                    borderRadius: "12px",
                    border: "1px solid #cbd5e0",
                    background: "white",
                    cursor: "pointer",
                    color: "#2d3748",
                  }}
                >
                  Continue shopping
                </button>
                <button
                  onClick={handlePayment}
                  style={{
                    padding: "12px 18px",
                    borderRadius: "12px",
                    border: "none",
                    background: "#2f855a",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Proceed to payment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
