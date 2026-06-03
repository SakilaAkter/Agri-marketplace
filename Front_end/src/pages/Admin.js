import React, { useState } from "react";

function Admin() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderContent = () => {
    if (activePage === "Dashboard") {
      return (
        <div>
          <h1 style={{ fontSize: "22px", marginBottom: "24px", color: "#1a202c" }}>Admin Dashboard</h1>

          <div style={{ display: "flex", gap: "16px", marginBottom: "32px", flexWrap: "wrap" }}>
            <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px 24px", flex: "1", minWidth: "150px" }}>
              <p style={{ color: "#718096", fontSize: "13px", margin: "0 0 6px 0" }}>Total Farmers</p>
              <p style={{ fontSize: "28px", fontWeight: "bold", color: "#2563eb", margin: 0 }}>128</p>
            </div>
            <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px 24px", flex: "1", minWidth: "150px" }}>
              <p style={{ color: "#718096", fontSize: "13px", margin: "0 0 6px 0" }}>Total Consumers</p>
              <p style={{ fontSize: "28px", fontWeight: "bold", color: "#7c3aed", margin: 0 }}>340</p>
            </div>
            <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px 24px", flex: "1", minWidth: "150px" }}>
              <p style={{ color: "#718096", fontSize: "13px", margin: "0 0 6px 0" }}>Total Products</p>
              <p style={{ fontSize: "28px", fontWeight: "bold", color: "#d97706", margin: 0 }}>85</p>
            </div>
            <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px 24px", flex: "1", minWidth: "150px" }}>
              <p style={{ color: "#718096", fontSize: "13px", margin: "0 0 6px 0" }}>Total Orders</p>
              <p style={{ fontSize: "28px", fontWeight: "bold", color: "#16a34a", margin: 0 }}>204</p>
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
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>Fresh Tomatoes</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>Rahim Ali</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>40/kg</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9" }}>
                    <span style={{ background: "#fef9c3", color: "#854d0e", padding: "3px 10px", borderRadius: "20px", fontSize: "12px" }}>Pending</span>
                  </td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9" }}>
                    <button style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "6px", border: "1px solid #e2e8f0", background: "white", cursor: "pointer" }}>View</button>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>Organic Rice</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>Karim Hossain</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>60/kg</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9" }}>
                    <span style={{ background: "#dcfce7", color: "#166534", padding: "3px 10px", borderRadius: "20px", fontSize: "12px" }}>Approved</span>
                  </td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9" }}>
                    <button style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "6px", border: "1px solid #e2e8f0", background: "white", cursor: "pointer" }}>View</button>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", color: "#1a202c" }}>Green Chili</td>
                  <td style={{ padding: "12px 16px", color: "#1a202c" }}>Fatema Begum</td>
                  <td style={{ padding: "12px 16px", color: "#1a202c" }}>80/kg</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ background: "#fee2e2", color: "#991b1b", padding: "3px 10px", borderRadius: "20px", fontSize: "12px" }}>Flagged</span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <button style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "6px", border: "1px solid #e2e8f0", background: "white", cursor: "pointer" }}>View</button>
                  </td>
                </tr>
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
                {[
                  { name: "Rahim Ali", location: "Dhaka", products: 5, status: "Active" },
                  { name: "Karim Hossain", location: "Rajshahi", products: 8, status: "Active" },
                  { name: "Fatema Begum", location: "Chittagong", products: 3, status: "Inactive" },
                  { name: "Jamal Uddin", location: "Sylhet", products: 6, status: "Active" },
                ].map((farmer, i) => (
                  <tr key={i}>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{farmer.name}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{farmer.location}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{farmer.products}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9" }}>
                      <span style={{ background: farmer.status === "Active" ? "#dcfce7" : "#fee2e2", color: farmer.status === "Active" ? "#166534" : "#991b1b", padding: "3px 10px", borderRadius: "20px", fontSize: "12px" }}>
                        {farmer.status}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9" }}>
                      <button style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "6px", border: "1px solid #e2e8f0", background: "white", cursor: "pointer", marginRight: "6px" }}>View</button>
                      <button style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "6px", border: "1px solid #fca5a5", background: "#fee2e2", color: "#991b1b", cursor: "pointer" }}>Ban</button>
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
                {[
                  { name: "Sara Khan", email: "sara@email.com", orders: 12, status: "Active" },
                  { name: "Nabil Ahmed", email: "nabil@email.com", orders: 5, status: "Active" },
                  { name: "Riya Das", email: "riya@email.com", orders: 8, status: "Inactive" },
                  { name: "Tanvir Islam", email: "tanvir@email.com", orders: 3, status: "Active" },
                ].map((consumer, i) => (
                  <tr key={i}>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{consumer.name}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{consumer.email}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{consumer.orders}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9" }}>
                      <span style={{ background: consumer.status === "Active" ? "#dcfce7" : "#fee2e2", color: consumer.status === "Active" ? "#166534" : "#991b1b", padding: "3px 10px", borderRadius: "20px", fontSize: "12px" }}>
                        {consumer.status}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9" }}>
                      <button style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "6px", border: "1px solid #e2e8f0", background: "white", cursor: "pointer", marginRight: "6px" }}>View</button>
                      <button style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "6px", border: "1px solid #fca5a5", background: "#fee2e2", color: "#991b1b", cursor: "pointer" }}>Ban</button>
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
                {[
                  { name: "Fresh Tomatoes", farmer: "Rahim Ali", price: "40/kg", status: "Pending" },
                  { name: "Organic Rice", farmer: "Karim Hossain", price: "60/kg", status: "Approved" },
                  { name: "Green Chili", farmer: "Fatema Begum", price: "80/kg", status: "Flagged" },
                  { name: "Sweet Mango", farmer: "Jamal Uddin", price: "120/kg", status: "Approved" },
                ].map((product, i) => (
                  <tr key={i}>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{product.name}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{product.farmer}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{product.price}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9" }}>
                      <span style={{
                        background: product.status === "Approved" ? "#dcfce7" : product.status === "Pending" ? "#fef9c3" : "#fee2e2",
                        color: product.status === "Approved" ? "#166534" : product.status === "Pending" ? "#854d0e" : "#991b1b",
                        padding: "3px 10px", borderRadius: "20px", fontSize: "12px"
                      }}>
                        {product.status}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9" }}>
                      <button style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "6px", border: "1px solid #bbf7d0", background: "#dcfce7", color: "#166534", cursor: "pointer", marginRight: "6px" }}>Approve</button>
                      <button style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "6px", border: "1px solid #fca5a5", background: "#fee2e2", color: "#991b1b", cursor: "pointer" }}>Delete</button>
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
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Consumer</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Product</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Amount</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "#718096", fontWeight: "500", borderBottom: "1px solid #e2e8f0" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "#001", consumer: "Sara Khan", product: "Organic Rice", amount: "600", status: "Delivered" },
                  { id: "#002", consumer: "Nabil Ahmed", product: "Fresh Tomatoes", amount: "200", status: "Pending" },
                  { id: "#003", consumer: "Riya Das", product: "Green Chili", amount: "400", status: "Processing" },
                  { id: "#004", consumer: "Tanvir Islam", product: "Sweet Mango", amount: "960", status: "Delivered" },
                ].map((order, i) => (
                  <tr key={i}>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#2563eb" }}>{order.id}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{order.consumer}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{order.product}</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", color: "#1a202c" }}>{order.amount} TK</td>
                    <td style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9" }}>
                      <span style={{
                        background: order.status === "Delivered" ? "#dcfce7" : order.status === "Pending" ? "#fef9c3" : "#e0f2fe",
                        color: order.status === "Delivered" ? "#166534" : order.status === "Pending" ? "#854d0e" : "#0369a1",
                        padding: "3px 10px", borderRadius: "20px", fontSize: "12px"
                      }}>
                        {order.status}
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