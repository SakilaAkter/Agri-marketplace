import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(stored);
  }, []);

  return (
    <div style={{ background: "#f7faf8", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: "24px", maxWidth: "980px", margin: "0 auto" }}>
        <div style={{ marginBottom: "22px" }}>
          <h1 style={{ margin: 0, fontSize: "28px", color: "#1a202c" }}>
            My Orders
          </h1>
          <div style={{ color: "#4a5568", marginTop: "8px" }}>
            Track your past purchases and order status.
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
              No orders yet. Place an order from the product page first.
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
                    gap: "16px",
                    flexWrap: "wrap",
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
                      Date
                    </div>
                    <div style={{ fontWeight: "700", color: "#1a202c" }}>
                      {order.date}
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
                    <div style={{ fontWeight: "700", color: "#2f855a" }}>
                      {order.status}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "16px" }}>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#4a5568",
                      marginBottom: "10px",
                    }}
                  >
                    Items
                  </div>
                  <div style={{ display: "grid", gap: "10px" }}>
                    {order.items.map((item, index) => (
                      <div
                        key={`${order.id}-${index}`}
                        style={{
                          borderRadius: "10px",
                          background: "#f8fafc",
                          padding: "12px 14px",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>
                          {item.name || item.product_name || item.product}
                        </span>
                        <span>
                          {item.qty} × {item.price} Tk
                        </span>
                      </div>
                    ))}
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

export default Orders;
