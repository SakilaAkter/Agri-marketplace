import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/*const districts = [
  "Jessore",
  "Rangpur",
  "Pabna",
  "Bogura",
  "Dinajpur",
  "Khulna",
  "Sylhet",
  "Dhaka",
  "Chattogram",
];
*/

function Register() {
  const [role, setRole] = useState("1");
//  const [consumerType, setConsumerType] = useState("");
  const [form, setForm] = useState({
    user_name: "",
    phone: "",
    email: "",
    password: "",
    confirm: "",
    about: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleRegister = async () => {
    if (!form.user_name || !form.phone || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role_id: role}),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed.");
        return;
      }
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setError("Server error. Please try again.");
    }
  };

  const roleBtn = (r, label, icon) => (
    <div
      onClick={() => setRole(r)}
      style={{
        flex: 1,
        padding: "12px 8px",
        border: `0.5px solid ${role === r ? "#2f855a" : "#cbd5e0"}`,
        borderRadius: "8px",
        background: role === r ? "#f0faf4" : "#f7fafc",
        cursor: "pointer",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "22px", marginBottom: "4px" }}>{icon}</div>
      <div
        style={{
          fontSize: "12px",
          fontWeight: "500",
          color: role === r ? "#166534" : "#718096",
        }}
      >
        {label}
      </div>
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0faf4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "860px",
          borderRadius: "16px",
          overflow: "hidden",
          border: "0.5px solid #e2e8f0",
        }}
      >
        {/* Left panel */}
        <div
          style={{
            width: "38%",
            background: "#1a4731",
            padding: "48px 32px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontFamily: "Georgia, serif",
              color: "#a8e6c1",
              fontSize: "22px",
              fontWeight: "600",
              marginBottom: "28px",
            }}
          >
            AgriMarket
          </div>
          <h2
            style={{
              fontFamily: "Georgia, serif",
              color: "#fff",
              fontSize: "22px",
              lineHeight: "1.3",
              marginBottom: "12px",
            }}
          >
            Join thousands of farmers & buyers
          </h2>
          <p
            style={{
              color: "#86c9a3",
              fontSize: "13px",
              lineHeight: "1.7",
              marginBottom: "24px",
            }}
          >
            Create your account and start connecting with Bangladesh's
            agricultural marketplace.
          </p>
          {[
            "Free to register",
            "Verified farmer profiles",
            "Secure payments",
            "64 districts covered",
          ].map((f) => (
            <div
              key={f}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#38a169",
                  flexShrink: 0,
                }}
              />
              <span style={{ color: "#c8f0d8", fontSize: "13px" }}>{f}</span>
            </div>
          ))}
          <div style={{ marginTop: "auto", paddingTop: "32px" }}>
            <div style={{ fontSize: "12px", color: "#5a9e78" }}>
              Already have an account?
            </div>
            <a
              href="/login"
              style={{ color: "#a8e6c1", fontSize: "13px", fontWeight: "500" }}
            >
              Sign in instead
            </a>
          </div>
        </div>

        {/* Right panel */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            padding: "40px",
            overflowY: "auto",
          }}
        >
          <h3
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "20px",
              marginBottom: "6px",
            }}
          >
            Create your account
          </h3>
          <p
            style={{ fontSize: "13px", color: "#718096", marginBottom: "24px" }}
          >
            Choose your role to get started
          </p>

          {success && (
            <div
              style={{
                background: "#f0fdf4",
                border: "0.5px solid #86efac",
                borderRadius: "8px",
                padding: "10px 14px",
                fontSize: "13px",
                color: "#166534",
                marginBottom: "16px",
              }}
            >
              Account created! Redirecting to login...
            </div>
          )}
          {error && (
            <div
              style={{
                background: "#fef2f2",
                border: "0.5px solid #fca5a5",
                borderRadius: "8px",
                padding: "10px 14px",
                fontSize: "13px",
                color: "#991b1b",
                marginBottom: "16px",
              }}
            >
              {error}
            </div>
          )}

          {/* Role selector */}
          <div
            style={{
              fontSize: "12px",
              fontWeight: "500",
              color: "#718096",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "10px",
            }}
          >
            I am a...
          </div>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            {roleBtn("1", "Farmer", "👨‍🌾")}
            {roleBtn("2", "Consumer", "🛒")}
            {/*roleBtn("admin", "Admin", "🛡️")*/}
          </div>

          {/*role === "consumer" && (
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#718096",
                  marginBottom: "6px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Consumer type
              </label>
              <select
                value={consumerType}
                onChange={(e) => setConsumerType(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "0.5px solid #cbd5e0",
                  borderRadius: "8px",
                  fontSize: "14px",
                  background: "#f7fafc",
                }}
              >
                <option value="">Select type...</option>
                <option>Individual</option>
                <option>Restaurant</option>
                <option>Grocery Shop</option>
              </select>
            </div>
          )*/}

          {/* Form fields */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            {[
              ["user_name", "Full name", "Your full name", "text"],
              ["phone", "Phone number", "01XXXXXXXXX", "tel"],
            ].map(([k, l, p, t]) => (
              <div key={k}>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#718096",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {l}
                </label>
                <input
                  type={t}
                  value={form[k]}
                  onChange={set(k)}
                  placeholder={p}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "0.5px solid #cbd5e0",
                    borderRadius: "8px",
                    fontSize: "14px",
                    background: "#f7fafc",
                  }}
                />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: "500",
                color: "#718096",
                marginBottom: "6px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Email address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="you@example.com"
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "0.5px solid #cbd5e0",
                borderRadius: "8px",
                fontSize: "14px",
                background: "#f7fafc",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            {[
              ["password", "Password", "Min. 8 characters"],
              ["confirm", "Confirm password", "Repeat password"],
            ].map(([k, l, p]) => (
              <div key={k}>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#718096",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {l}
                </label>
                <input
                  type="password"
                  value={form[k]}
                  onChange={set(k)}
                  placeholder={p}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "0.5px solid #cbd5e0",
                    borderRadius: "8px",
                    fontSize: "14px",
                    background: "#f7fafc",
                  }}
                />
              </div>
            ))}
          </div>

          {/*role === "farmer" && (
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#718096",
                  marginBottom: "6px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Farm district
              </label>
              <select
                value={form.district}
                onChange={set("district")}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "0.5px solid #cbd5e0",
                  borderRadius: "8px",
                  fontSize: "14px",
                  background: "#f7fafc",
                }}
              >
                <option value="">Select district...</option>
                {districts.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          )*/}

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: "500",
                color: "#718096",
                marginBottom: "6px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              About you
            </label>

            <textarea
              value={form.about}
              onChange={set("about")}
              placeholder="Write a short description about yourself..."
              rows="3"
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "0.5px solid #cbd5e0",
                borderRadius: "8px",
                fontSize: "14px",
                background: "#f7fafc",
                resize: "none",
              }}
            />
          </div>

          <button
            onClick={handleRegister}
            style={{
              width: "100%",
              padding: "12px",
              background: "#2f855a",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              marginTop: "4px",
            }}
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
