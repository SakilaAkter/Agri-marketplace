import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

/*const historyData = [
  { action: "Listed new product: Fresh Tomato", date: "Today, 10:24 AM" },
  {
    action: "Accepted order #1042 from Dhaka Restaurant",
    date: "Yesterday, 3:10 PM",
  },
  { action: "Updated price: Potato 15 Tk → 18 Tk/kg", date: "Jan 8, 2026" },
  { action: "Rejected custom deal from Khan Grocery", date: "Jan 7, 2026" },
  { action: "Profile information updated", date: "Jan 5, 2026" },
];*/

function Profile() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    about: "",
    location: "",
  });

  const [role_name, setRole_name] = useState("");
  const [productCount, setProductCount] = useState("");
  const [orders, setOrders] = useState("");
  const [memberSince, setMemberSince] = useState("");
  const [activeDeals, setActiveDeals] = useState("");

  const [saved, setSaved] = useState(false);
  const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
  const [pwMsg, setPwMsg] = useState("");
  const [historyData, setHistoryData] = useState([]);

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

  useEffect(() => {
    const fetchProfile = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        try {
            const res = await fetch(
                "http://localhost:3000/profile",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!res.ok) {
                navigate("/login");
                return;
            }
            const data = await res.json();
            setForm({
                name: data.user_name,
                phone: data.phone,
                email: data.email,
                about: data.about,
                location: data.location
            });
            setRole_name(data.role_name);
            setOrders(data.orders);
            setProductCount(data.product_count);
            const dateOnly = new Date(data.date_added).toISOString().split("T")[0];
            setMemberSince(dateOnly);
            setActiveDeals(data.active_deal);

        } catch (err) {
            console.log(err);
            navigate("/login");
        }
      };
      fetchProfile();
  }, []);

  useEffect(() => {
    const fetchHistoryData = async () => {
      const token = localStorage.getItem("token");
          if (!token) {
              navigate("/login");
              return;
          }
      try {
        const res = await fetch("http://localhost:3000/history", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
        const data = await res.json();
        setHistoryData(data.history);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHistoryData();
  }, []);


  const set = (k) => (e) => setForm({
    ...form,
    [k]: k === "location" ? Number(e.target.value) : e.target.value,
  });
  const setPw = (k) => (e) => setPwForm({ ...pwForm, [k]: e.target.value });

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          about: form.about,
          location: form.location,
        }),
      });
      if (!res.ok) throw new Error("Update failed");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.log(err);
      alert("Failed to update profile");
    }
  };

  const handlePwUpdate = async () => {
      if (!pwForm.current || !pwForm.newPw || !pwForm.confirm) {
          setPwMsg("Please fill all password fields.");
          return;
      }
      if (pwForm.newPw !== pwForm.confirm) {
          setPwMsg("New passwords do not match.");
          return;
      }
      try {
          const token = localStorage.getItem("token");
          const res = await fetch("http://localhost:3000/change-password", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                  current: pwForm.current,
                  newPw: pwForm.newPw
              })
          });
          const data = await res.json();
          if (!res.ok) {
              setPwMsg(data.message);
              return;
          }
          setPwMsg("Password updated successfully!");
          setPwForm({ current: "", newPw: "", confirm: "" });
      } catch (err) {
          setPwMsg("Server error");
      }
  };

  const inputStyle = {
    padding: "9px 12px",
    border: "0.5px solid #cbd5e0",
    borderRadius: "8px",
    fontSize: "13px",
    background: "#f7faf8",
    width: "100%",
    fontFamily: "DM Sans, sans-serif",
    color: "var(--color-text-primary)",
    outline: "none",
  };

  const labelStyle = {
    fontSize: "11px",
    color: "#718096",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "5px",
    display: "block",
  };

  const card = (children, extra = {}) => (
    <div
      style={{
        background: "#fff",
        border: "0.5px solid #e2e8f0",
        borderRadius: "14px",
        padding: "20px",
        ...extra,
      }}
    >
      {children}
    </div>
  );

  return (
    <div style={{ background: "#f7faf8", minHeight: "100vh" }}>
      <Navbar />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: "20px",
          padding: "24px 28px",
          maxWidth: "1000px",
        }}
      >
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {card(
            <>
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  background: "#1a4731",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "500",
                  color: "#a8e6c1",
                  margin: "0 auto 14px",
                }}
              >
                RK
              </div>
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "18px",
                  fontWeight: "600",
                  textAlign: "center",
                  marginBottom: "6px",
                }}
              >
                {form.name}
              </div>
              <div style={{ textAlign: "center" }}>
                <span
                  style={{
                    fontSize: "11px",
                    padding: "3px 10px",
                    borderRadius: "10px",
                    background: "#d1fae5",
                    color: "#065f46",
                  }}
                >
                  {role_name}
                </span>
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#718096",
                  textAlign: "center",
                  marginTop: "8px",
                }}
              >
                📍 {locations.find(l => l.location_id == form.location)?.location_name}
              </div>
            </>,
          )}

          {card(
            <>
              <div
                style={{
                  fontSize: "11px",
                  color: "#718096",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "12px",
                }}
              >
                Account stats
              </div>
              {[
                ["Products listed", productCount],
                ["Orders received", orders],
                ["Active deals", activeDeals],
                ["Member since", memberSince],
              ].map(([label, val]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "7px 0",
                    borderBottom: "0.5px solid #f0faf4",
                  }}
                >
                  <span style={{ fontSize: "13px", color: "#718096" }}>
                    {label}
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#166534",
                    }}
                  >
                    {val}
                  </span>
                </div>
              ))}
            </>,
          )}
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* Personal info */}
          {card(
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Personal information
                </div>
                <button
                  onClick={handleSave}
                  style={{
                    fontSize: "12px",
                    padding: "6px 16px",
                    background: saved ? "#276749" : "#2f855a",
                    color: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontFamily: "DM Sans, sans-serif",
                  }}
                >
                  {saved ? "Saved ✓" : "Save changes"}
                </button>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                {[
                  ["name", "Full name", "text"],
                  ["phone", "Phone number", "tel"],
                  ["email", "Email address", "email"],
                  ["about", "About", "text"],
                ].map(([k, label, type]) => (
                  <div key={k}>
                    <label style={labelStyle}>{label}</label>
                    <input
                      type={type}
                      value={form[k]}
                      onChange={set(k)}
                      style={inputStyle}
                    />
                  </div>
                ))}
                  <div>
                    <label style={labelStyle}>Location</label>

                    <select
                      value={form.location}
                      onChange={set("location")}
                      style={inputStyle}
                    >
                      <option value="">Select location...</option>

                      {locations.map((loc) => (
                        <option key={loc.location_id} value={loc.location_id}>
                          {loc.location_name}
                        </option>
                      ))}
                    </select>
                  </div>
              </div>
            </>,
          )}

          {/* Change password */}
          {card(
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Change password
                </div>
                <button
                  onClick={handlePwUpdate}
                  style={{
                    fontSize: "12px",
                    padding: "6px 16px",
                    background: "#2f855a",
                    color: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontFamily: "DM Sans, sans-serif",
                  }}
                >
                  Update
                </button>
              </div>
              {pwMsg && (
                <div
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    marginBottom: "12px",
                    background: pwMsg.includes("success")
                      ? "#f0fdf4"
                      : "#fef2f2",
                    color: pwMsg.includes("success") ? "#166534" : "#991b1b",
                    border: `0.5px solid ${pwMsg.includes("success") ? "#86efac" : "#fca5a5"}`,
                  }}
                >
                  {pwMsg}
                </div>
              )}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "12px",
                }}
              >
                {[
                  ["current", "Current password"],
                  ["newPw", "New password"],
                  ["confirm", "Confirm new"],
                ].map(([k, label]) => (
                  <div key={k}>
                    <label style={labelStyle}>{label}</label>
                    <input
                      type="password"
                      value={pwForm[k]}
                      onChange={setPw(k)}
                      placeholder="••••••••"
                      style={inputStyle}
                    />
                  </div>
                ))}
              </div>
            </>,
          )}

          {/* Usage history */}
          {card(
            <>
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "14px",
                }}
              >
                Usage history
              </div>
              {historyData.map((h, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    padding: "10px 0",
                    borderBottom:
                      i < historyData.length - 1
                        ? "0.5px solid #f0faf4"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#2f855a",
                      marginTop: "5px",
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "500" }}>
                      {h.action}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#718096",
                        marginTop: "2px",
                      }}
                    >
                      {h.date}
                    </div>
                  </div>
                </div>
              ))}
            </>,
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
