import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const categories = ["Vegetables", "Fruits", "Grains", "Spices"];
const locations = ["Dhaka", "Chittagong", "Rajshahi", "Khulna"];

function CreateProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",

    category: "Vegetables",
    location: "Dhaka",
    stock: 10,
    price: 0,
    description: "",
  });
  const [saved, setSaved] = useState(false);

  const suggestion = useMemo(() => {
    const base = form.price || 0;
    const stockBonus = form.stock > 50 ? -2 : form.stock < 10 ? 3 : 0;
    const categoryAdj =
      form.category === "Fruits" ? 5 : form.category === "Spices" ? 8 : 0;
    const locationPref = form.location === "Dhaka" ? 2 : 0;
    const suggested = Math.max(
      5,
      Math.round(base + stockBonus + categoryAdj + locationPref),
    );
    return `${suggested} Tk/kg`;
  }, [form.price, form.stock, form.category, form.location]);

  const handleChange = (key) => (e) => {
    const value =
      key === "stock" || key === "price"
        ? Number(e.target.value)
        : e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const products = JSON.parse(localStorage.getItem("farmerProducts") || "[]");
    const newProduct = {
      id: Date.now(),
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      suggestedPrice: suggestion,
    };
    localStorage.setItem(
      "farmerProducts",
      JSON.stringify([newProduct, ...products]),
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setForm({
      name: "",
      category: "Vegetables",
      location: "Dhaka",
      stock: 10,
      price: 0,
      description: "",
    });
  };

  return (
    <div style={{ background: "#f7faf8", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ marginBottom: "22px" }}>
          <h1 style={{ margin: 0, fontSize: "28px", color: "#1a202c" }}>
            Create Product
          </h1>
          <div style={{ color: "#4a5568", marginTop: "8px" }}>
            Add a new product listing with AI-assisted price guidance.
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
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gap: "16px" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#4a5568",
                  }}
                >
                  Product name
                </label>
                <input
                  value={form.name}
                  onChange={handleChange("name")}
                  placeholder="e.g. Fresh tomato"
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "12px",
                    border: "1px solid #cbd5e0",
                  }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#4a5568",
                    }}
                  >
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={handleChange("category")}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "12px",
                      border: "1px solid #cbd5e0",
                    }}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#4a5568",
                    }}
                  >
                    Location
                  </label>
                  <select
                    value={form.location}
                    onChange={handleChange("location")}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "12px",
                      border: "1px solid #cbd5e0",
                    }}
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#4a5568",
                    }}
                  >
                    Stock (kg)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.stock}
                    onChange={handleChange("stock")}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "12px",
                      border: "1px solid #cbd5e0",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#4a5568",
                    }}
                  >
                    Price (Tk/kg)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.price}
                    onChange={handleChange("price")}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "12px",
                      border: "1px solid #cbd5e0",
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#4a5568",
                  }}
                >
                  Product description
                </label>
                <textarea
                  value={form.description}
                  onChange={handleChange("description")}
                  rows="4"
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "12px",
                    border: "1px solid #cbd5e0",
                    resize: "vertical",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div style={{ fontSize: "12px", color: "#718096" }}>
                    AI suggested price
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#1a202c",
                    }}
                  >
                    {suggestion}
                  </div>
                </div>
                <button
                  type="submit"
                  style={{
                    padding: "14px 22px",
                    borderRadius: "12px",
                    background: "#2f855a",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Save product
                </button>
              </div>

              {saved && (
                <div style={{ color: "#2f855a", fontWeight: "600" }}>
                  Product saved successfully.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
