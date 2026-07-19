import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";


function Admin() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("Dashboard");
  const [adminDboardData, setAdminDboardData] = useState({});
  /*
          const dashboardData = {
            farmers: farmers_c[0].fmc,
            consumers: consumers_c[0].cmc,
            products: products_c[0].pdc,
            orders: orders_c[0].odc
        };
  */
 const [farmerInfo, setFarmerInfo] = useState([]);
 const [consumerInfo, setConsumerInfo] = useState([]);
 const [productInfo, setProductInfo] = useState([]);
 const [orderInfo, setOrderInfo] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        try {
            const res = await fetch(
                "http://localhost:3000/admindashboard",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!res.ok) {
                navigate("/");
                return;
            }
            const data = await res.json();
            setAdminDboardData(data)

        } catch (err) {
            console.log(err);
            navigate("/");
        }
      };
      fetchAdminData();
  }, []);

  
  useEffect(() => {
    const fetchFarmerData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        try {
            const res = await fetch(
                "http://localhost:3000/farmerinfo",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!res.ok) {
                navigate("/");
                return;
            }
            const data = await res.json();
            setFarmerInfo(data)

        } catch (err) {
            console.log(err);
            navigate("/");
        }
      };
      fetchFarmerData();
  }, []);

  useEffect(() => {
    const fetchConsumerData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        try {
            const res = await fetch(
                "http://localhost:3000/consumerinfo",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!res.ok) {
                navigate("/");
                return;
            }
            const data = await res.json();
            setConsumerInfo(data)

        } catch (err) {
            console.log(err);
            navigate("/");
        }
      };
      fetchConsumerData();
  }, []);

  useEffect(() => {
    const fetchOrderData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        try {
            const res = await fetch(
                "http://localhost:3000/orderinfo",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!res.ok) {
                navigate("/");
                return;
            }
            const data = await res.json();
            setOrderInfo(data)

        } catch (err) {
            console.log(err);
            navigate("/");
        }
      };
      fetchOrderData();
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        try {
            const res = await fetch(
                "http://localhost:3000/productinfo",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!res.ok) {
                navigate("/");
                return;
            }
            const data = await res.json();
            setProductInfo(data)

        } catch (err) {
            console.log(err);
            navigate("/");
        }
      };
      fetchProductData();
  }, []);

  const handleToggleStatus = async (user_id, setState) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:3000/tstatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user_id }),
    });

    if (!res.ok) {
      console.log("Failed to update status");
      return;
    }

    const data = await res.json();
    console.log(data.message);

   setState((prev) =>
      prev.map((f) =>
        f.user_id === user_id
          ? { ...f, status: f.status === "banned" ? "active" : "banned" }
          : f
      )
    );

  

  } catch (err) {
    console.log(err);
  }
};

  const handleToggleStatus2 = async (product_id, setState) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:3000/tstatus2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product_id }),
    });

    if (!res.ok) {
      console.log("Failed to update status");
      return;
    }

    const data = await res.json();
    console.log(data.message);

   setState((prev) =>
      prev.map((f) =>
        f.product_id === product_id
          ? { ...f, status: f.status === "banned" ? "active" : "banned" }
          : f
      )
    );

  

  } catch (err) {
    console.log(err);
  }
};



  const renderContent = () => {
    if (activePage === "Dashboard") {
      return (
        <div>
          <h1 style={{ fontSize: "22px", marginBottom: "24px", color: "#1a202c" }}>Admin Dashboard</h1>

          <div style={{ display: "flex", gap: "16px", marginBottom: "32px", flexWrap: "wrap" }}>
            <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px 24px", flex: "1", minWidth: "150px" }}>
              <p style={{ color: "#718096", fontSize: "13px", margin: "0 0 6px 0" }}>Total Farmers</p>
              <p style={{ fontSize: "28px", fontWeight: "bold", color: "#2563eb", margin: 0 }}>{adminDboardData.farmers}</p>  
            </div>
            <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px 24px", flex: "1", minWidth: "150px" }}>
              <p style={{ color: "#718096", fontSize: "13px", margin: "0 0 6px 0" }}>Total Consumers</p>
              <p style={{ fontSize: "28px", fontWeight: "bold", color: "#7c3aed", margin: 0 }}>{adminDboardData.consumers}</p>    
            </div>
            <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px 24px", flex: "1", minWidth: "150px" }}>
              <p style={{ color: "#718096", fontSize: "13px", margin: "0 0 6px 0" }}>Total Products</p>
              <p style={{ fontSize: "28px", fontWeight: "bold", color: "#d97706", margin: 0 }}>{adminDboardData.products}</p>   
            </div> 
            <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px 24px", flex: "1", minWidth: "150px" }}>
              <p style={{ color: "#718096", fontSize: "13px", margin: "0 0 6px 0" }}>Total Orders</p>
              <p style={{ fontSize: "28px", fontWeight: "bold", color: "#16a34a", margin: 0 }}>{adminDboardData.orders}</p>
            </div>
          </div>

          <h2 style={{ fontSize: "16px", marginBottom: "12px", color: "#1a202c" }}>Recent Products</h2>
          <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden", marginBottom: "28px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Product</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Farmer</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Price</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Status</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                  {productInfo.slice(0, 5).map((product, i) => (
                  <tr key={i}>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{product.product_name} {product.product_id}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{product.farmer_id}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{product.price}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9" }}>
                      <span style={{
                        background: product.status === "active" ? "#dcfce7" : product.status === "banned" ? "#fef9c3" : "#fee2e2",
                        color: product.status === "active" ? "#166534" : product.status === "banned" ? "#854d0e" : "#991b1b",
                        padding: "3px 10px", borderRadius: "20px", fontSize: "12px"
                      }}>
                        {product.status}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9" }}>
                      {/*<button style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "6px", border: "1px solid #bbf7d0", background: "#dcfce7", color: "#166534", cursor: "pointer", marginRight: "6px" }}>Approve</button>*/}
                      <button
                        onClick={() => handleToggleStatus2(product.product_id, setProductInfo)}
                        style={{
                          fontSize: "12px",
                          padding: "4px 12px",
                          borderRadius: "6px",
                          border: product.status === "banned"
                            ? "1px solid #86efac"
                            : "1px solid #fca5a5",
                          background: product.status === "banned"
                            ? "#dcfce7"
                            : "#fee2e2",
                          color: product.status === "banned"
                            ? "#166534"
                            : "#991b1b",
                          cursor: "pointer",
                        }}
                      >
                        {product.status === "banned" ? "Unban" : "Ban"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activePage === "Farmers") {
      return (
        <div>
          <h1 style={{ fontSize: "22px", marginBottom: "24px", color: "#1a202c" }}>Farmers</h1>
          <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Name</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Location</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Products</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Status</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {farmerInfo.map((farmer, i) => (
                  <tr key={i}>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{farmer.user_name} {farmer.user_id}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{farmer.location_name}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{farmer.pcnt}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9" }}>
                      <span style={{ background: farmer.status === "active" ? "#dcfce7" : "#fee2e2", color: farmer.status === "active" ? "#166534" : "#991b1b", padding: "3px 10px", borderRadius: "20px", fontSize: "12px" }}>
                        {farmer.status}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9" }}>
                      <button style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "6px", border: "1px solid #e2e8f0", background: "white", cursor: "pointer", marginRight: "6px" }}>View</button>   {/*waiting for new page. need to add user_id in backend. With that would go to that page*/}
                      <button
                        onClick={() => handleToggleStatus(farmer.user_id, setFarmerInfo)}
                        style={{
                          fontSize: "12px",
                          padding: "4px 12px",
                          borderRadius: "6px",
                          border: farmer.status === "banned"
                            ? "1px solid #86efac"
                            : "1px solid #fca5a5",
                          background: farmer.status === "banned"
                            ? "#dcfce7"
                            : "#fee2e2",
                          color: farmer.status === "banned"
                            ? "#166534"
                            : "#991b1b",
                          cursor: "pointer",
                        }}
                      >
                        {farmer.status === "banned" ? "Unban" : "Ban"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activePage === "Consumers") {
      return (
        <div>
          <h1 style={{ fontSize: "22px", marginBottom: "24px", color: "#1a202c" }}>Consumers</h1>
          <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Name</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Email</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Orders</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Status</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {consumerInfo.map((consumer, i) => (
                  <tr key={i}>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{consumer.user_name} {consumer.user_id}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{consumer.email}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{consumer.ocnt}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9" }}>
                      <span style={{ background: consumer.status === "active" ? "#dcfce7" : "#fee2e2", color: consumer.status === "active" ? "#166534" : "#991b1b", padding: "3px 10px", borderRadius: "20px", fontSize: "12px" }}>
                        {consumer.status}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9" }}>
                      <button style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "6px", border: "1px solid #e2e8f0", background: "white", cursor: "pointer", marginRight: "6px" }}>View</button>
                      <button
                        onClick={() => handleToggleStatus(consumer.user_id, setConsumerInfo)}
                        style={{
                          fontSize: "12px",
                          padding: "4px 12px",
                          borderRadius: "6px",
                          border: consumer.status === "banned"
                            ? "1px solid #86efac"
                            : "1px solid #fca5a5",
                          background: consumer.status === "banned"
                            ? "#dcfce7"
                            : "#fee2e2",
                          color: consumer.status === "banned"
                            ? "#166534"
                            : "#991b1b",
                          cursor: "pointer",
                        }}
                      >
                        {consumer.status === "banned" ? "Unban" : "Ban"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activePage === "Products") {
      return (
        <div>
          <h1 style={{ fontSize: "22px", marginBottom: "24px", color: "#1a202c" }}>Products</h1>
          <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Product</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Farmer</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Price</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Status</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {productInfo.map((product, i) => (
                  <tr key={i}>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{product.product_name} {product.product_id}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{product.farmer_id}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{product.price}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9" }}>
                      <span style={{
                        background: product.status === "active" ? "#dcfce7" : product.status === "banned" ? "#fef9c3" : "#fee2e2",
                        color: product.status === "active" ? "#166534" : product.status === "banned" ? "#854d0e" : "#991b1b",
                        padding: "3px 10px", borderRadius: "20px", fontSize: "12px"
                      }}>
                        {product.status}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9" }}>
                      {/*<button style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "6px", border: "1px solid #bbf7d0", background: "#dcfce7", color: "#166534", cursor: "pointer", marginRight: "6px" }}>Approve</button>*/}
                      <button
                        onClick={() => handleToggleStatus2(product.product_id, setProductInfo)}
                        style={{
                          fontSize: "12px",
                          padding: "4px 12px",
                          borderRadius: "6px",
                          border: product.status === "banned"
                            ? "1px solid #86efac"
                            : "1px solid #fca5a5",
                          background: product.status === "banned"
                            ? "#dcfce7"
                            : "#fee2e2",
                          color: product.status === "banned"
                            ? "#166534"
                            : "#991b1b",
                          cursor: "pointer",
                        }}
                      >
                        {product.status === "banned" ? "Unban" : "Ban"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activePage === "Orders") {
      return (
        <div>
          <h1 style={{ fontSize: "22px", marginBottom: "24px", color: "#1a202c" }}>Orders</h1>
          <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Order ID</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Consumer ID</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Product ID</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Order Date</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {orderInfo.map((order, i) => (
                  <tr key={i}>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#2563eb" }}>{order.order_id}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{order.buyer_id}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{order.product_id}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{order.order_date}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9" }}>
                      <span style={{
                        background: order.sta_tus === "Delivered" ? "#dcfce7" : order.sta_tus == "paid" ? "#fef9c3" : "#e0f2fe",
                        color: order.sta_tus === "Delivered" ? "#166534" : order.sta_tus == "paid" ? "#854d0e" : "#0369a1",
                        padding: "3px 10px", borderRadius: "20px", fontSize: "12px"
                      }}>
                        {order.sta_tus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activePage === "Reports") {
      return (
        <div>
          <h1 style={{ fontSize: "22px", marginBottom: "24px", color: "#1a202c" }}>Reports</h1>
          <p style={{ color: "#718096" }}>No reports yet.</p>
        </div>
      );
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>

      <div style={{
        width: "240px",
        background: "#1a2332",
        color: "#a0aec0",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}>
        <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <h2 style={{ color: "white", fontSize: "16px", margin: 0 }}>Agri Admin</h2>
        </div>

        <div style={{ padding: "12px 8px" }}>
          {["Dashboard", "Farmers", "Consumers", "Products", "Orders", "Reports"].map((item) => (
            <div
              key={item}
              onClick={() => setActivePage(item)}
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                cursor: "pointer",
                marginBottom: "4px",
                color: activePage === item ? "white" : "#a0aec0",
                background: activePage === item ? "#2563eb" : "transparent",
                fontWeight: activePage === item ? "500" : "normal",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, padding: "30px", background: "#f7fafc" }}>
        {renderContent()}
      </div>

    </div>
  );
}

export default Admin;