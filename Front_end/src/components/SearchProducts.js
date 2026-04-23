import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchProducts() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    navigate(
      `/products?search=${query}&category=${category}&location=${location}`,
    );
  };

  return (
    <div
      style={{
        padding: "28px 32px",
        background: "#fff",
        borderBottom: "1px solid #e2e8f0",
        display: "flex",
        gap: "10px",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <input
        type="text"
        placeholder="Search vegetables, fruits, grains..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        style={{
          padding: "10px 16px",
          border: "1px solid #cbd5e0",
          borderRadius: "24px",
          fontSize: "14px",
          width: "280px",
          background: "#f7fafc",
          outline: "none",
        }}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
          padding: "10px 14px",
          border: "1px solid #cbd5e0",
          borderRadius: "24px",
          fontSize: "14px",
          background: "#f7fafc",
        }}
      >
        <option value="">All categories</option>
        <option>Vegetables</option>
        <option>Fruits</option>
        <option>Grains</option>
        <option>Spices</option>
      </select>

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{
          padding: "10px 14px",
          border: "1px solid #cbd5e0",
          borderRadius: "24px",
          fontSize: "14px",
          background: "#f7fafc",
        }}
      >
        <option value="">All locations</option>
        <option>Jessore</option>
        <option>Rangpur</option>
        <option>Pabna</option>
        <option>Khulna</option>
        <option>Bogura</option>
        <option>Dinajpur</option>
      </select>

      <button
        onClick={handleSearch}
        style={{
          background: "#2f855a",
          color: "white",
          border: "none",
          padding: "10px 22px",
          borderRadius: "24px",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </div>
  );
}

export default SearchProducts;
