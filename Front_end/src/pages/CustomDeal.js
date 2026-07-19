import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

function CustomDeal() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    product_id: "",
    agreed_price: "",
    quantity_per_day: "",
    start_date: "",
    end_date: "",
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  useEffect(() => {fetchProducts(); fetchRequests();}, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/customdeal/products",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      setLoadingRequests(true);
      const response = await fetch(
        "http://localhost:3000/customdeal",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setRequests(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRequests(false);
    }
  };

  const handleChange = (key) => (e) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (key === "product_id") {
      const product = products.find(
        (p) => p.product_id == value
      );
      setSelectedProduct(product);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    try {
      const response = await fetch(
        "http://localhost:3000/customdeal",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        return;
      }
      setSubmitted(true);
      setForm({
        product_id: "",
        agreed_price: "",
        quantity_per_day: "",
        start_date: "",
        end_date: "",
      });
      setSelectedProduct(null);
      fetchRequests();
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
            <h3 style={{ marginTop: 0 }}>Request a Custom Deal</h3>

            <div style={{ display: "grid", gap: "12px" }}>

              <select
                required
                value={form.product_id}
                onChange={handleChange("product_id")}
                style={inputStyle}
              >
                <option value="">Select Product</option>

                {products.map((product) => (
                  <option
                    key={product.product_id}
                    value={product.product_id}
                  >
                    {product.product_name}
                  </option>
                ))}
              </select>

              {selectedProduct && (
                <>
                  <div
                    style={{
                      background: "#f8fafc",
                      borderRadius: "10px",
                      padding: "12px",
                    }}
                  >
                    <b>Farmer:</b> {selectedProduct.farmer_name}
                    <br />
                    <b>Current Price:</b> ৳{selectedProduct.price}/
                    {selectedProduct.unit_name}
                    <br />
                    <b>Available:</b> {selectedProduct.quantity}{" "}
                    {selectedProduct.unit_name}
                  </div>
                </>
              )}

              <input
                required
                type="number"
                min="0.01"
                step="0.01"
                value={form.agreed_price}
                onChange={handleChange("agreed_price")}
                placeholder="Your Offer Price"
                style={inputStyle}
              />

              <input
                required
                type="number"
                min="0.01"
                step="0.01"
                value={form.quantity_per_day}
                onChange={handleChange("quantity_per_day")}
                placeholder="Quantity Per Day"
                style={inputStyle}
              />

              <input
                required
                type="date"
                value={form.start_date}
                onChange={handleChange("start_date")}
                style={inputStyle}
              />

              <input
                required
                type="date"
                value={form.end_date}
                onChange={handleChange("end_date")}
                style={inputStyle}
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
                <div style={{ color: "#2f855a" }}>
                  Custom deal request submitted successfully.
                </div>
              )}

              {error && (
                <div style={{ color: "red" }}>
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
            <h3 style={{ marginTop: 0 }}>My Custom Deals</h3>

            {loadingRequests ? (
              <p>Loading...</p>
            ) : requests.length === 0 ? (
              <p style={{ color: "#4a5568" }}>
                No custom deal requests yet.
              </p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gap: "12px",
                }}
              >
                {requests.map((request) => (
                  <div
                    key={request.deal_id}
                    style={{
                      background: "#f8fafc",
                      borderRadius: "10px",
                      padding: "14px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "700",
                        fontSize: "16px",
                        color: "#1a202c",
                      }}
                    >
                      {request.product_name}
                    </div>

                    <div
                      style={{
                        color: "#4a5568",
                        marginTop: "6px",
                        fontSize: "14px",
                      }}
                    >
                      <b>Farmer:</b> {request.farmer_name}
                    </div>

                    <div
                      style={{
                        color: "#4a5568",
                        marginTop: "4px",
                        fontSize: "14px",
                      }}
                    >
                      <b>Current Price:</b> ৳{request.current_price}
                    </div>

                    <div
                      style={{
                        color: "#4a5568",
                        marginTop: "4px",
                        fontSize: "14px",
                      }}
                    >
                      <b>Your Offer:</b> ৳{request.agreed_price}
                    </div>

                    <div
                      style={{
                        color: "#4a5568",
                        marginTop: "4px",
                        fontSize: "14px",
                      }}
                    >
                      <b>Quantity / Day:</b> {request.quantity_per_day}
                    </div>

                    <div
                      style={{
                        color: "#4a5568",
                        marginTop: "4px",
                        fontSize: "14px",
                      }}
                    >
                      <b>Duration:</b>{" "}
                      {request.start_date?.substring(0, 10)} →{" "}
                      {request.end_date?.substring(0, 10)}
                    </div>

                    <div
                      style={{
                        marginTop: "10px",
                      }}
                    >
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: "20px",
                          fontSize: "13px",
                          fontWeight: "600",
                          background:
                            request.status === "Pending"
                              ? "#fef3c7"
                              : request.status === "Accepted"
                              ? "#dcfce7"
                              : "#fee2e2",
                          color:
                            request.status === "Pending"
                              ? "#92400e"
                              : request.status === "Accepted"
                              ? "#166534"
                              : "#991b1b",
                        }}
                      >
                        {request.status}
                      </span>
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
