import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed.");
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      if (data.role === "farmer") navigate("/farmer/dashboard");
      else if (data.role === "admin") navigate("/admin/dashboard");
      else navigate("/");
    } catch {
      setError("Server error. Please try again.");
    }
  };

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
            width: "42%",
            background: "#1a4731",
            padding: "48px 36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Georgia, serif",
              color: "#a8e6c1",
              fontSize: "22px",
              fontWeight: "600",
              marginBottom: "32px",
            }}
          >
            AgriMarket
          </div>
          <h2
            style={{
              fontFamily: "Georgia, serif",
              color: "#fff",
              fontSize: "24px",
              lineHeight: "1.3",
              marginBottom: "12px",
            }}
          >
            Welcome back to the farm
          </h2>
          <p
            style={{
              color: "#86c9a3",
              fontSize: "13px",
              lineHeight: "1.7",
              marginBottom: "28px",
            }}
          >
            Sign in to access your dashboard and manage your agricultural
            marketplace activities.
          </p>
          {[
            "Real-time order tracking",
            "AI-powered price suggestions",
            "Direct farmer-to-buyer deals",
            "Voice-to-text product listing",
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
        </div>

        {/* Right panel */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            padding: "48px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h3
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "20px",
              marginBottom: "6px",
            }}
          >
            Sign in to your account
          </h3>
          <p
            style={{ fontSize: "13px", color: "#718096", marginBottom: "28px" }}
          >
            Enter your credentials to continue
          </p>

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "0.5px solid #cbd5e0",
                borderRadius: "8px",
                fontSize: "14px",
                background: "#f7fafc",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "8px" }}>
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
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "0.5px solid #cbd5e0",
                borderRadius: "8px",
                fontSize: "14px",
                background: "#f7fafc",
                outline: "none",
              }}
            />
          </div>

          <div
            style={{
              textAlign: "right",
              fontSize: "12px",
              color: "#2f855a",
              cursor: "pointer",
              marginBottom: "20px",
            }}
          >
            Forgot password?
          </div>

          <button
            onClick={handleLogin}
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
            }}
          >
            Sign in
          </button>

          <p
            style={{
              textAlign: "center",
              fontSize: "13px",
              color: "#718096",
              marginTop: "20px",
            }}
          >
            Don't have an account?{" "}
            <a href="/register" style={{ color: "#2f855a", fontWeight: "500" }}>
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
