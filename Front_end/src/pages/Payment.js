import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [message, setMessage] = useState("");

  const amount = location.state?.amount || 0;
  const cart =
    location.state?.cart || JSON.parse(localStorage.getItem("cart") || "[]");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvc) {
      setMessage("Please fill all payment fields.");
      return;
    }
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      amount,
      items: cart,
      status: "Pending",
    };
    localStorage.setItem("orders", JSON.stringify([order, ...orders]));
    localStorage.removeItem("cart");
    setMessage("Payment successful. Your order has been placed.");
    setTimeout(() => {
      navigate("/orders");
    }, 1100);
  };

  return (
    <div style={{ background: "#f7faf8", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: "24px", maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ marginBottom: "22px" }}>
          <h1 style={{ margin: 0, fontSize: "28px", color: "#1a202c" }}>
            Payment
          </h1>
          <div style={{ color: "#4a5568", marginTop: "8px" }}>
            Complete payment for your purchase.
          </div>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            padding: "24px",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "14px", color: "#718096" }}>
              Total amount
            </div>
            <div
              style={{ fontSize: "32px", fontWeight: "700", color: "#1a202c" }}
            >
              {amount} Tk
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                color: "#4a5568",
              }}
            >
              Card number
            </label>
            <input
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="0000 0000 0000 0000"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #cbd5e0",
                marginBottom: "16px",
              }}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    color: "#4a5568",
                  }}
                >
                  Expiry
                </label>
                <input
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid #cbd5e0",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    color: "#4a5568",
                  }}
                >
                  CVC
                </label>
                <input
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  placeholder="123"
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid #cbd5e0",
                  }}
                />
              </div>
            </div>

            {message && (
              <div style={{ marginBottom: "16px", color: "#2f855a" }}>
                {message}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                background: "#2f855a",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Pay now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
