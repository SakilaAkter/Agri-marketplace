import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

function CustomDeal() {
  const [form, setForm] = useState({
    productName: "",
    quantity: "",
    preferredPrice: "",
    deliveryDate: "",
    note: "",
  });
  const [requests, setRequests] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setRequests(JSON.parse(localStorage.getItem("customDeals") || "[]"));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRequest = {
      id: Date.now(),
      ...form,
      status: "Pending",
      createdAt: new Date().toLocaleString(),
    };

    const updated = [newRequest, ...requests];
    setRequests(updated);
    localStorage.setItem("customDeals", JSON.stringify(updated));
    setSubmitted(true);
    setForm({
      productName: "",
      quantity: "",
      preferredPrice: "",
      deliveryDate: "",
      note: "",
    });
  };

  return (
    <div style={{ background: "#f7faf8", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ margin: 0, fontSize: "28px", color: "#1a202c" }}>
            Custom Deal Requests
          </h1>
          <p style={{ marginTop: "8px", color: "#4a5568" }}>
            Ask farmers for bulk prices or special arrangements.
          </p>
        </div>

        <div
          style={{
            display: "grid",

            gap: "20px",
            gridTemplateColumns: "1.1fr 0.9fr",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "20px",
              border: "1px solid #e2e8f0",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Request a custom deal</h3>
            <div style={{ display: "grid", gap: "12px" }}>
              <input
                required
                value={form.productName}
                onChange={(e) =>
                  setForm({ ...form, productName: e.target.value })
                }
                placeholder="Product name"
                style={inputStyle}
              />
              <input
                required
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                placeholder="Quantity needed"
                style={inputStyle}
              />
              <input
                required
                value={form.preferredPrice}
                onChange={(e) =>
                  setForm({ ...form, preferredPrice: e.target.value })
                }
                placeholder="Preferred price"
                style={inputStyle}
              />
              <input
                type="date"
                value={form.deliveryDate}
                onChange={(e) =>
                  setForm({ ...form, deliveryDate: e.target.value })
                }
                style={inputStyle}
              />
              <textarea
                required
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                placeholder="Describe your request"
                rows="4"
                style={{ ...inputStyle, resize: "vertical" }}
              />
              <button
                type="submit"
                style={{
                  background: "#2f855a",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  cursor: "pointer",
                  fontWeight: "700",
                }}
              >
                Send Request
              </button>
              {submitted && (
                <div style={{ color: "#2f855a", fontSize: "14px" }}>
                  Your request has been sent successfully.
                </div>
              )}
            </div>
          </form>

          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "20px",
              border: "1px solid #e2e8f0",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Recent requests</h3>
            {requests.length === 0 ? (
              <p style={{ color: "#4a5568" }}>No custom deals yet.</p>
            ) : (
              <div style={{ display: "grid", gap: "10px" }}>
                {requests.map((request) => (
                  <div
                    key={request.id}
                    style={{
                      background: "#f8fafc",
                      borderRadius: "10px",
                      padding: "12px",
                    }}
                  >
                    <div style={{ fontWeight: "700", color: "#1a202c" }}>
                      {request.productName}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#4a5568",
                        marginTop: "4px",
                      }}
                    >
                      Qty: {request.quantity} • Price: {request.preferredPrice}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#718096",
                        marginTop: "4px",
                      }}
                    >
                      {request.status} • {request.createdAt}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "10px",
  border: "1px solid #cbd5e0",
  fontSize: "14px",
  boxSizing: "border-box",
};

export default CustomDeal;
