import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

function Report() {
  const [form, setForm] = useState({
    report_type: "Product issue",
    subject: "",
    description: "",
    order_id: "",
  });

  const [reports, setReports] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const fetchReports = async () => {
    try {
      const response = await fetch("http://localhost:3000/report", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setReports(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {fetchReports();}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...form,
          order_id: form.order_id === "" ? null : form.order_id,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        return;
      }

      setSubmitted(true);
      setForm({
        report_type: "Product issue",
        subject: "",
        description: "",
        order_id: "",
      });

      fetchReports();
    } catch (err) {
      console.error(err);
      setError("Server Error");
    }
  };

  return (
    <div style={{ background: "#f7faf8", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ margin: 0, fontSize: "28px", color: "#1a202c" }}>
            Report an Issue
          </h1>
          <p style={{ marginTop: "8px", color: "#4a5568" }}>
            Share problems with products, payments, or delivery.
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
            <h3 style={{ marginTop: 0 }}>Submit a report</h3>
            <div style={{ display: "grid", gap: "12px" }}>
              <select
                value={form.report_type}
                onChange={(e) => setForm({ ...form, report_type: e.target.value })}
                style={inputStyle}
              >
                <option>Product issue</option>
                <option>Payment issue</option>
                <option>Delivery issue</option>
                <option>Account issue</option>
                <option>Other</option>
              </select>
              <input
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="Subject"
                style={inputStyle}
              />
              <input
                value={form.order_id}
                onChange={(e) => setForm({ ...form, order_id: e.target.value })}
                placeholder="Order ID (optional)"
                style={inputStyle}
              />
              <textarea
                required
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Describe the issue"
                rows="5"
                style={{
                  ...inputStyle,
                  resize: "vertical",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#d97706",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  cursor: "pointer",
                  fontWeight: "700",
                }}
              >
                Submit Report
              </button>
              {submitted && (
                <div style={{ color: "#2f855a", fontSize: "14px" }}>
                  Your report has been submitted successfully.
                </div>
              )}

              {error && (
                <div style={{ color: "#e53e3e", fontSize: "14px" }}>
                  {error}
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
            <h3 style={{ marginTop: 0 }}>Previous reports</h3>
            {reports.length === 0 ? (
              <p style={{ color: "#4a5568" }}>
                No reports submitted yet.
              </p>
            ) : (
              <div style={{ display: "grid", gap: "10px" }}>
                {reports.map((report) => (
                  <div
                    key={report.report_id}
                    style={{
                      background: "#f8fafc",
                      borderRadius: "10px",
                      padding: "12px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "700",
                        color: "#1a202c",
                      }}
                    >
                      {report.subject}
                    </div>

                    <div
                      style={{
                        fontSize: "13px",
                        color: "#4a5568",
                        marginTop: "4px",
                      }}
                    >
                      {report.report_type}
                    </div>

                    {report.order_id && (
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#4a5568",
                          marginTop: "4px",
                        }}
                      >
                        Order ID: {report.order_id}
                      </div>
                    )}

                    <div
                      style={{
                        fontSize: "13px",
                        color: "#4a5568",
                        marginTop: "4px",
                      }}
                    >
                      {report.description}
                    </div>

                    <div
                      style={{
                        fontSize: "12px",
                        color: "#718096",
                        marginTop: "8px",
                      }}
                    >
                      {report.sta_tus} •{" "}
                      {new Date(report.date).toLocaleString()}
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

export default Report;
