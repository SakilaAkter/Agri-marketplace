import React, { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


function CreateProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryMember, setCategoryMember] = useState([]);
  const [units, setUnits] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await fetch("http://localhost:3000/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCat();
  }, []);

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await fetch("http://localhost:3000/categorymember");
        const data = await res.json();
        setCategoryMember(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCat();
  }, []);

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await fetch("http://localhost:3000/unity");
        const data = await res.json();
        setUnits(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCat();
  }, []);

  const [form, setForm] = useState({
      product_name: "",
      category_id: "1",
      category_member_id: "",                         ///
      unit_id: "1",
      quantity: "1",
      price: "1",
      min_sell_amount: "1",
      discount_amount: "",
      discount_for_percent: "",
      description: ""
  });
  const [saved, setSaved] = useState(false);

  const suggestion = useMemo(() => {
    const base = form.price || 0;
    const stockBonus = form.quantity > 50 ? -2 : form.quantity < 10 ? 3 : 0;
    const categoryAdj =
      form.category_id === "Fruits" ? 5 : form.category_id === "Spices" ? 8 : 0;
    const locationPref = "Dhaka" === "Dhaka" ? 2 : 0;
    const suggested = Math.max(
      5,
      Math.round(base + stockBonus + categoryAdj + locationPref),
    );
    return `${suggested} Tk/kg`;
  }, [form.price, form.quantity, form.category_id, "Dhaka"]);

  const memberIds = categoryMember
  .filter((loc) => loc.M_category_id == form.category_id)
  .map((loc) => loc.M_id);
  form.category_member_id = memberIds[0];
    const handleChange = (key) => (e) => {
        console.log(key);
        setForm((prev) => ({
            ...prev,
            [key]: e.target.value,
        }));
    }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("in handlesubmit");
            localStorage.setItem(
      "farmerProducts",
      JSON.stringify(form),
    );
        console.log(form);
    if (!form.product_name || !form.unit_id || !form.category_id || !form.min_sell_amount || !form.category_member_id || !form.quantity || !form.price) {
      setError("Please fill in all fields.");
      return;
    }

    if((!form.discount_amount && form.discount_for_percent) || (form.discount_amount && !form.discount_for_percent)){
      setError("Please fill in all fields2.");
      return;      
    }

    try {
      const res = await fetch("http://localhost:3000/addproduct", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Addition Failed");
        return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      setForm({
      product_name: "",
      category_id: "1",
      category_member_id: "",                         ///
      unit_id: "1",
      quantity: "1",
      price: "1",
      min_sell_amount: "1",
      discount_amount: "",
      discount_for_percent: "",
      description: ""
    });
    } catch {
      setError("Server error. Please try again.");
    }
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
                  value={form.product_name}
                  onChange={handleChange("product_name")}                                  //what the heck is this name??
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
                    value={form.category_id}
                    onChange={handleChange("category_id")}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "12px",
                      border: "1px solid #cbd5e0",
                    }}
                  >
                      {categories.map((loc) => (
                      <option
                        key={loc.category_id}
                        value={loc.category_id}
                      >
                        {loc.category_name}
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
                    Species
                  </label>
                  <select
                    value={form.category_member_id}
                    onChange={handleChange("category_member_id")}
                    style={{
                      width: "100%",
                      padding: "12px", 
                      borderRadius: "12px",
                      border: "1px solid #cbd5e0",
                    }}
                  >
                    {categoryMember.filter((loc) => loc.M_category_id == form.category_id).map((loc) => (
                      <option key={loc.M_id} value={loc.M_id}>
                        {loc.M_name}
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
                    Stock
                  </label>
                  <input
                      type="number"
                      min="0.01"
                      step="0.01"
                    value={form.quantity}
                    onChange={handleChange("quantity")}
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
                    Price (Tk/Unit)
                  </label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
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
                    Minimum Quantity
                  </label>
                  <input
                      type="number"
                      min="0.01"
                      step="0.01"
                    value={form.min_sell_amount}
                    onChange={handleChange("min_sell_amount")}
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
                    Unit
                  </label>
                  <select
                    value={form.unit_id}          
                    onChange={handleChange("unit_id")}
                    style={{
                      width: "100%",
                      padding: "12px", 
                      borderRadius: "12px",
                      border: "1px solid #cbd5e0",
                    }}
                  >
                    {units.map((loc) => (
                      <option key={loc.unit_id} value={loc.unit_id}>
                        {loc.unit_name}
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
                    Discount For
                  </label>
                  <input
                      type="number"
                      min="0.01"
                      step="0.01"
                    value={form.discount_amount}
                    onChange={handleChange("discount_amount")}
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
                    Discount Amount (Tk/Unit)
                  </label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={form.discount_for_percent}
                    onChange={handleChange("discount_for_percent")}
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
                  /*onClick = {handleSubmit}*/
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
                  Add product
                </button>
              </div>

              {error && (
    <div style={{ color: "red", backgroundColor: "#fee", padding: "12px", borderRadius: "8px", marginTop: "12px" }}>
      {error}
    </div>
  )}

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
