import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const statusStyles = {
  paid: { background: "#fef3c7", color: "#92400e" },
  accepted: { background: "#d1fae5", color: "#065f46" },
  rejected: { background: "#fee2e2", color: "#991b1b" },
};

function ViewOrders() {
  const [orders, setOrders] = useState([]);

useEffect(() => {
    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3000/orderinfofarmer", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            setOrders(data);

        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    fetchOrders();
}, []);

  return (
    <div style={{ background: "#f7faf8", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: "24px", maxWidth: "980px", margin: "0 auto" }}>
        <div style={{ marginBottom: "22px" }}>
          <h1 style={{ margin: 0, fontSize: "28px", color: "#1a202c" }}>
            View Orders
          </h1>
          <div style={{ color: "#4a5568", marginTop: "8px" }}>
            Review orders placed for your farmer products.
          </div>
        </div>

        {orders.length === 0 ? (
          <div
            style={{
              padding: "28px",
              borderRadius: "16px",
              background: "white",
              border: "1px solid #e2e8f0",
            }}
          >
            <p style={{ margin: 0, color: "#4a5568" }}>
              No farmer orders available yet.
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "18px" }}>
            {orders.map((order) => (
              <div
                key={order.id}
                style={{
                  background: "white",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  padding: "20px",
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
                    <div style={{ fontSize: "14px", color: "#718096" }}>
                      Order ID
                    </div>
                    <div style={{ fontWeight: "700", color: "#1a202c" }}>
                      {order.id}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", color: "#718096" }}>
                      Buyer
                    </div>
                    <div style={{ fontWeight: "700", color: "#1a202c" }}>
                      {order.buyer}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", color: "#718096" }}>
                      Amount
                    </div>
                    <div style={{ fontWeight: "700", color: "#1a202c" }}>
                      {order.amount} Tk
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", color: "#718096" }}>
                      Status
                    </div>
                    <div
                      style={{
                        fontWeight: "700",
                        color: statusStyles[order.status]?.color || "#1a202c",
                      }}
                    >
                      {order.status}
                    </div>
                  </div>
                </div>

                <div
                  style={{ marginTop: "16px", display: "grid", gap: "10px" }}
                >
                  {order.items?.map((item, index) => (
                    <div
                      key={`${order.id}-${index}`}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "12px",
                        padding: "12px 14px",
                        borderRadius: "12px",
                        background: "#f8fafc",
                      }}
                    >
                      <span>{item.product || item.name}</span>
                      <span>
                        {item.qty} × {item.price} Tk
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewOrders;
