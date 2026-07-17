import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const aiInsights = [
  "↑ Tomato prices rising +12% — consider increasing price by 2-3 Tk.",
  "📦 3 pending orders — accept before 6 PM to maintain your rating.",
  "⚠️ Cauliflower stock is low (8kg) — restock soon.",
  "💡 Onion demand is high in Dhaka this week — increase supply.",
];

const statusStyle = {
  pending: { background: "#fef3c7", color: "#92400e" },
  accepted: { background: "#d1fae5", color: "#065f46" },
  rejected: { background: "#fee2e2", color: "#991b1b" },
};

function FarmerDashboard() {
  const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [user, setUser] = useState([]);
    const [locations, setLocations] = useState([]);
    
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

useEffect(() => {
    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3000/myproducts", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            setTopProducts(data);

        } catch (err) {
            console.error("Fetch error2:", err);
        }
    };

    fetchProducts();
}, []);

useEffect(() => {
    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3000/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            setUser(data);

        } catch (err) {
            console.error("Fetch error2:", err);
        }
    };

    fetchUser();
}, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch("http://localhost:3000/locations");
        const data = await res.json();
        setLocations(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLocations();
  }, []);

  const totProd = topProducts.length;
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const addedLastWeek = topProducts.filter(
    (p) => new Date(p.date_added) > oneWeekAgo
  ).length;

  const totOrd = orders.length;

  const addedLastWeekOrder = orders.filter(
    (p) => new Date(p.date) > oneWeekAgo
  ).length;

  let amount2 = 0;

  for (const p of orders) {
    if (p.status === "accepted") {
      amount2 += p.amount;
    }
  }

    const smallestProduct =
      orders.length > 0
        ? orders.reduce((min, p) => (p.qty < min.qty ? p : min))
        : null;

  const handleOrder = async (id, action) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: action } : o)),
    );
        try {
        const res = await fetch("http://localhost:3000/rejectorder", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // if using JWT
        },
        body: JSON.stringify({
    order_id: id, statust: action,
}),
        });
    } catch (err) {
        console.error(err);
        alert("Rejection failed.");
    }
  };

  const stats = [
    { val: totProd, label: "Products listed", change: `↑ ${addedLastWeek} this week`, up: true },
    { val: totOrd, label: "Total orders", change: `↑ ${addedLastWeekOrder} this week`, up: true },
    {
      val: amount2,
      label: "Total revenue",
      change: "↑ 8% vs last week",
      up: true,
    },
    { val: "3", label: "Active deals", change: "1 pending review", up: false },
  ];

  const navItems = [
    { icon: "📊", label: "Dashboard", path: "/farmer/dashboard", active: true },
    {
      icon: "🌾",
      label: "My Products",
      path: "/farmer/products",
      active: false,
    },
    { icon: "📦", label: "View Orders", path: "/farmer/orders", active: false },
    { icon: "🤝", label: "Custom Deals", path: "/farmer/deals", active: false },
    {
      icon: "📈",
      label: "Price History",
      path: "/farmer/prices",
      active: false,
    },
    { icon: "👤", label: "Profile", path: "/profile", active: false },
    { icon: "🚩", label: "Reports", path: "/report", active: false },
  ];

  const card = (children, style = {}) => (
    <div
      style={{
        background: "#fff",
        border: "0.5px solid #e2e8f0",
        borderRadius: "12px",
        padding: "16px",
        ...style,
      }}
    >
      {children}
    </div>
  );

  const cardTitle = (title, linkLabel, linkPath) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "14px",
      }}
    >
      <div style={{ fontSize: "13px", fontWeight: "500" }}>{title}</div>
      {linkLabel && (
        <span
          onClick={() => navigate(linkPath)}
          style={{ fontSize: "11px", color: "#2f855a", cursor: "pointer" }}
        >
          {linkLabel}
        </span>
      )}
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f7faf8" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "200px",
          flexShrink: 0,
          background: "#1a4731",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily: "Georgia, serif",
            color: "#a8e6c1",
            fontSize: "16px",
            padding: "20px 18px",
            borderBottom: "0.5px solid rgba(255,255,255,0.1)",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          AgriMarket
        </div>

        <div
          style={{
            padding: "14px 18px 6px",
            fontSize: "10px",
            color: "#5a9e78",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Main
        </div>

        {navItems.map((item) => (
          <div
            key={item.label}
            onClick={() => navigate(item.path)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "11px 18px",
              fontSize: "13px",
              cursor: "pointer",
              color: item.active ? "#fff" : "#86c9a3",
              background: item.active
                ? "rgba(255,255,255,0.12)"
                : "transparent",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) =>
              !item.active &&
              (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
            }
            onMouseLeave={(e) =>
              !item.active && (e.currentTarget.style.background = "transparent")
            }
          >
            <span style={{ fontSize: "15px", width: "18px" }}>{item.icon}</span>
            {item.label}
          </div>
        ))}

        {/* Logout */}
        <div
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "11px 18px",
            fontSize: "13px",
            cursor: "pointer",
            color: "#86c9a3",
            marginTop: "auto",
            borderTop: "0.5px solid rgba(255,255,255,0.1)",
          }}
        >
          <span style={{ fontSize: "15px" }}>🚪</span> Logout
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <div
          style={{
            background: "#fff",
            borderBottom: "0.5px solid #e2e8f0",
            padding: "14px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Farmer Dashboard
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "13px", fontWeight: "500" }}>
                {user.user_name}
              </div>
              <div style={{ fontSize: "11px", color: "#718096" }}>

                {locations.find(l => l.location_id == user.location)?.location_name}, Bangladesh
              </div>
            </div>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#d1fae5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "500",
                color: "#065f46",
                cursor: "pointer",
              }}
              onClick={() => navigate("/profile")}
            >
              RK
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "20px 24px", overflowY: "auto" }}>
          {/* AI Insights */}
          <div
            style={{
              background: "#f0fdf4",
              border: "0.5px solid #86efac",
              borderRadius: "12px",
              padding: "14px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: "500",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              🤖 AI Insights for today
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
              }}
            >
              {aiInsights.map((tip, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: "11px",
                    color: "#166534",
                    padding: "8px 10px",
                    background: "#fff",
                    borderRadius: "8px",
                    border: "0.5px solid #bbf7d0",
                    lineHeight: "1.5",
                  }}
                >
                  {tip}
                </div>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  background: "#fff",
                  border: "0.5px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "500",
                    color: "#166534",
                    marginBottom: "4px",
                  }}
                >
                  {s.val}
                </div>
                <div style={{ fontSize: "11px", color: "#718096" }}>
                  {s.label}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    marginTop: "4px",
                    color: s.up ? "#166534" : "#991b1b",
                  }}
                >
                  {s.change}
                </div>
              </div>
            ))}
          </div>

          {/* Quick action buttons */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            {[
              {
                icon: "➕",
                label: "Add product",
                path: "/farmer/products/new",
              },
              { icon: "📦", label: "View orders", path: "/farmer/orders" },
              { icon: "🤝", label: "View deals", path: "/farmer/deals" },
              { icon: "📈", label: "Price history", path: "/farmer/prices" },
            ].map((btn) => (
              <button
                key={btn.label}
                onClick={() => navigate(btn.path)}
                style={{
                  padding: "12px",
                  background: "#fff",
                  border: "0.5px solid #e2e8f0",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: "500",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f0faf4";
                  e.currentTarget.style.borderColor = "#2f855a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>

          {/* Orders + Alerts row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            {/* Recent orders */}
            {card(
              <>
                {cardTitle("Recent orders", "View all →", "/farmer/orders")}
                {orders.slice(0, 5).map((o) => (
                  <div
                    key={o.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "9px 0",
                      borderBottom: "0.5px solid #f0faf4",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "500" }}>
                        {o.id}
                      </div>
                      <div style={{ fontSize: "11px", color: "#718096" }}>
                        {o.buyer} · {o.items.name}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: "12px", fontWeight: "500" }}>
                        {o.amount} Tk
                      </span>
                      {o.status === "paid" ? (
                        <div style={{ display: "flex", gap: "4px" }}>
                          <button
                            onClick={() => handleOrder(o.id, "accept")}
                            style={{
                              padding: "3px 8px",
                              background: "#d1fae5",
                              color: "#065f46",
                              border: "none",
                              borderRadius: "6px",
                              fontSize: "10px",
                              cursor: "pointer",
                              fontWeight: "500",
                            }}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleOrder(o.id, "rejected")}
                            style={{
                              padding: "3px 8px",
                              background: "#fee2e2",
                              color: "#991b1b",
                              border: "none",
                              borderRadius: "6px",
                              fontSize: "10px",
                              cursor: "pointer",
                              fontWeight: "500",
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span
                          style={{
                            fontSize: "10px",
                            padding: "2px 8px",
                            borderRadius: "8px",
                            fontWeight: "500",
                            ...statusStyle[o.status],
                          }}
                        >
                          {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </>,
            )}

            {/* Alerts + Top products */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              {card(
                <>
                  {cardTitle("Alerts")}
                  {[
                    {
                      type: "danger",
                      msg: "🕒 3 orders pending — accept before 6 PM",
                    },
                    {
                      type: "warn",
                      msg: "⚠️ Cauliflower stock low — 8kg remaining",
                    },
                    {
                      type: "warn",
                      msg: "📊 Potato price dropped 8% in your area",
                    },
                  ].map((a, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 10px",
                        borderRadius: "8px",
                        marginBottom: "6px",
                        fontSize: "11px",
                        background: a.type === "danger" ? "#fee2e2" : "#fef3c7",
                        border: `0.5px solid ${a.type === "danger" ? "#fca5a5" : "#fcd34d"}`,
                        color: a.type === "danger" ? "#991b1b" : "#92400e",
                      }}
                    >
                      {a.msg}
                    </div>
                  ))}
                </>,
              )}

              {card(
                <>
                  {cardTitle("Top products", "Manage →", "/farmer/products")}
                  {topProducts.slice(0,6).map((p, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "8px 0",
                        borderBottom:
                          i < topProducts.length - 1
                            ? "0.5px solid #f0faf4"
                            : "none",
                      }}
                    >
                      <div
                        style={{
                          width: "34px",
                          height: "34px",
                          borderRadius: "8px",
                          background: "#f0faf4",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "18px",
                          flexShrink: 0,
                        }}
                      >
                      {p.image_link ? ( <img src={p.image_link} alt={p.product_name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', }} /> ) : ( <span style={{ fontSize: '18px' }}>📦</span> )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "12px", fontWeight: "500" }}>
                          {p.product_name}
                        </div>
                        <div style={{ fontSize: "11px", color: "#718096" }}>
                          {p.price} Tk/{p.unit_name} · {p.quantity}{p.unit_name} left
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "10px",
                          padding: "2px 7px",
                          borderRadius: "8px",
                          fontWeight: "500",
                          background: p.date_added === "Low" ? "#fee2e2" : "#d1fae5",
                          color: p.date_added === "Low" ? "#991b1b" : "#065f46",
                        }}
                      >
                        {p.date_added}
                      </span>
                    </div>
                  ))}
                </>,
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmerDashboard;
