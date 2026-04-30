import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const FALLBACK =
  "https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?w=400&h=300&fit=crop";

const badgeStyle = {
  Fresh: { background: "#d1fae5", color: "#065f46" },
  Popular: { background: "#fef3c7", color: "#92400e" },
  Seasonal: { background: "#ede9fe", color: "#4c1d95" },
};

const trendStyle = {
  up: { background: "#fee2e2", color: "#991b1b" },
  down: { background: "#d1fae5", color: "#065f46" },
  stable: { background: "#f1f5f9", color: "#334155" },
};

const trendLabel = { up: "↑ Rising", down: "↓ Falling", stable: "→ Stable" };

const hintStyle = {
  up: {
    background: "#fef2f2",
    color: "#991b1b",
    border: "0.5px solid #fecaca",
  },
  down: {
    background: "#f0fdf4",
    color: "#166534",
    border: "0.5px solid #bbf7d0",
  },
  stable: {
    background: "#f8fafc",
    color: "#475569",
    border: "0.5px solid #e2e8f0",
  },
};

function Products() {
  const navigate = useNavigate();
  const location = useLocation();

  const [allProducts, setAllProducts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);

  const params = new URLSearchParams(location.search);
  const initSearch = params.get("search") || "";
  const initCat = params.get("category") || "";
  const initLoc = params.get("location") || "";

  const [search, setSearch] = useState(initSearch);
  const [category, setCategory] = useState(initCat);
  const [locFilter, setLocFilter] = useState(initLoc);
  const [maxPrice, setMaxPrice] = useState(200);
  const [sort, setSort] = useState("latest");
  const [trends, setTrends] = useState(["up", "down", "stable"]);
  const [addedId, setAddedId] = useState(null);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]"),
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/product");

        const data = await res.json();

        const formattedProducts = data.map((p) => ({
          ...p,
          farmerInitials: p.farmer
            ?.split(" ")
            .map((w) => w[0])
            .join(""),
          badge: null,
          trend: "stable",
          trendPct: "0%",
          aiHint: "No trend data yet",
          gallery: [p.img],
          desc: p.product_desc
        }));

        setAllProducts(formattedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

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
    const fetchLocations = async () => {
      try {
        const res = await fetch("http://localhost:3000/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLocations();
  }, []);

  const toggleTrend = (t) =>
    setTrends((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );

  const filtered = allProducts
    .filter(
      (p) =>
        (search === "" ||
          p.name.toLowerCase().includes(search.toLowerCase())) &&
        (category === "" || p.category === category) &&
        (locFilter === "" || p.location === locFilter) &&
        p.price <= maxPrice &&
        trends.includes(p.trend),
    )
    .sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : sort === "trending"
            ? a.trend === "up"
              ? -1
              : b.trend === "up"
                ? 1
                : 0
            : a.id - b.id,
    );

  const addToCart = (product) => {
    const updated = [...cart];

    const step = Number(product.minOrder) || 1;
    const maxim = Number(product.stock);

    const exists = updated.find((i) => i.id === product.id);

    if (exists) {
      exists.qty = Number(exists.qty || 0) + step;
      if(exists.qty >= maxim) exists.qty = maxim; 
    } else {
      updated.push({ ...product, qty: step });
    }

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const sideLabel = {
    fontSize: "10px",
    fontWeight: "500",
    color: "#718096",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "8px",
    display: "block",
  };

  return (
    <div style={{ background: "#f7faf8", minHeight: "100vh" }}>
      <Navbar />

      {/* Search strip */}
      <div
        style={{
          background: "#fff",
          borderBottom: "0.5px solid #e2e8f0",
          padding: "12px 20px",
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search vegetables, fruits, grains..."
          style={{
            flex: 1,
            minWidth: "180px",
            padding: "8px 14px",
            border: "0.5px solid #cbd5e0",
            borderRadius: "20px",
            fontSize: "13px",
            background: "#f7faf8",
            outline: "none",
          }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "8px 10px",
            border: "0.5px solid #cbd5e0",
            borderRadius: "20px",
            fontSize: "12px",
            background: "#f7faf8",
          }}
        >
          <option value="">All categories</option>
          {categories.map((loc) => (
            <option
              key={loc.category_id}
              value={loc.category_name}
            >
              {loc.category_name}
            </option>
          ))}
        </select>
        <select
          value={locFilter}
          onChange={(e) => setLocFilter(e.target.value)}
          style={{
            padding: "8px 10px",
            border: "0.5px solid #cbd5e0",
            borderRadius: "20px",
            fontSize: "12px",
            background: "#f7faf8",
          }}
        >
          <option value="">All locations</option>

          {locations.map((loc) => (
            <option
              key={loc.location_id}
              value={loc.location_name}
            >
              {loc.location_name}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            padding: "8px 10px",
            border: "0.5px solid #cbd5e0",
            borderRadius: "20px",
            fontSize: "12px",
            background: "#f7faf8",
          }}
        >
          <option value="latest">Sort: Latest</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="trending">AI: Trending Up</option>
        </select>
        {cartCount > 0 && (
          <button
            onClick={() => navigate("/cart")}
            style={{
              background: "#1a4731",
              color: "#a8e6c1",
              border: "none",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "12px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            🛒 Cart ({cartCount})
          </button>
        )}
      </div>

      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <div
          style={{
            width: "200px",
            flexShrink: 0,
            background: "#fff",
            borderRight: "0.5px solid #e2e8f0",
            padding: "16px 14px",
            minHeight: "calc(100vh - 110px)",
          }}
        >
          {/* Category */}
          <div style={{ marginBottom: "18px" }}>
            <span style={sideLabel}>Category</span>
            {["Vegetables", "Fruits", "Grains", "Spices"].map((cat) => (
              <label
                key={cat}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "4px 0",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="cat"
                  checked={category === cat}
                  onChange={() => setCategory(category === cat ? "" : cat)}
                  style={{ accentColor: "#2f855a" }}
                />
                {cat}
              </label>
            ))}
          </div>

          {/* Price range */}
          <div style={{ marginBottom: "18px" }}>
            <span style={sideLabel}>Price range</span>
            <input
              type="range"
              min="0"
              max="200"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#2f855a" }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "10px",
                color: "#718096",
              }}
            >
              <span>0 Tk</span>
              <span>{maxPrice} Tk</span>
            </div>
          </div>

          {/* AI Trend */}
          <div style={{ marginBottom: "18px" }}>
            <span style={sideLabel}>AI price trend</span>
            {[
              { key: "up", label: "↑ Price rising", color: "#991b1b" },
              { key: "down", label: "↓ Price falling", color: "#166534" },
              { key: "stable", label: "→ Stable", color: "#475569" },
            ].map((t) => (
              <label
                key={t.key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "4px 0",
                  fontSize: "12px",
                  cursor: "pointer",
                  color: t.color,
                }}
              >
                <input
                  type="checkbox"
                  checked={trends.includes(t.key)}
                  onChange={() => toggleTrend(t.key)}
                  style={{ accentColor: "#2f855a" }}
                />
                {t.label}
              </label>
            ))}
          </div>

          {/* Location */}
          <div>
            <span style={sideLabel}>Location</span>
            {[
              "Jessore",
              "Rangpur",
              "Pabna",
              "Bogura",
              "Dinajpur",
              "Khulna",
            ].map((loc) => (
              <label
                key={loc}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "4px 0",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="loc"
                  checked={locFilter === loc}
                  onChange={() => setLocFilter(locFilter === loc ? "" : loc)}
                  style={{ accentColor: "#2f855a" }}
                />
                {loc}
              </label>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: "16px 20px" }}>
          {/* AI Legend */}
          <div
            style={{
              background: "#fff",
              border: "0.5px solid #e2e8f0",
              borderRadius: "10px",
              padding: "10px 14px",
              marginBottom: "14px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: "11px", fontWeight: "500" }}>
              🤖 AI price trends:
            </span>
            {[
              {
                bg: "#fee2e2",
                color: "#991b1b",
                label: "↑ Rising",
                desc: "Buy now",
              },
              {
                bg: "#d1fae5",
                color: "#065f46",
                label: "↓ Falling",
                desc: "Wait or bulk buy",
              },
              {
                bg: "#f1f5f9",
                color: "#334155",
                label: "→ Stable",
                desc: "Price steady",
              },
            ].map((l) => (
              <div
                key={l.label}
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <span
                  style={{
                    ...l,
                    fontSize: "9px",
                    padding: "2px 6px",
                    borderRadius: "5px",
                    fontWeight: "500",
                  }}
                >
                  {l.label}
                </span>
                <span style={{ fontSize: "11px", color: "#718096" }}>
                  {l.desc}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{ fontSize: "12px", color: "#718096", marginBottom: "12px" }}
          >
            Showing {filtered.length} products
          </div>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(168px, 1fr))",
              gap: "12px",
            }}
          >
            {filtered.map((p) => (
              <div
                key={p.id}
                style={{
                  background: "#fff",
                  border: "0.5px solid #e2e8f0",
                  borderRadius: "12px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "#2f855a")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "#e2e8f0")
                }
              >
                {/* Image */}
                <div
                  style={{
                    height: "110px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                  onClick={() => navigate(`/products/${p.id}`)}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = FALLBACK;
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {p.badge && (
                    <span
                      style={{
                        position: "absolute",
                        top: "8px",
                        left: "8px",
                        fontSize: "9px",
                        padding: "2px 6px",
                        borderRadius: "6px",
                        fontWeight: "500",
                        ...badgeStyle[p.badge],
                      }}
                    >
                      {p.badge}
                    </span>
                  )}
                  <span
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      fontSize: "9px",
                      padding: "2px 6px",
                      borderRadius: "6px",
                      fontWeight: "500",
                      ...trendStyle[p.trend],
                    }}
                  >
                    {trendLabel[p.trend]} {p.trendPct}
                  </span>
                </div>

                {/* Body */}
                <div style={{ padding: "10px 12px" }}>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      marginBottom: "2px",
                    }}
                  >
                    {p.name}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#166534",
                      fontWeight: "500",
                      marginBottom: "2px",
                    }}
                  >
                    {p.price} Tk/{p.unit}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#718096",
                      marginBottom: "6px",
                    }}
                  >
                    {p.location} · {p.farmer}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      marginBottom: "7px",
                      lineHeight: "1.4",
                      ...hintStyle[p.trend],
                    }}
                  >
                    🤖 {p.aiHint}
                  </div>
                  <button
                    onClick={() => addToCart(p)}
                    style={{
                      width: "100%",
                      padding: "7px",
                      background: addedId === p.id ? "#dcfce7" : "#f0faf4",
                      border: "0.5px solid #86efac",
                      borderRadius: "8px",
                      fontSize: "11px",
                      color: "#166534",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                  >
                    {addedId === p.id ? "Added ✓" : "Add to cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div
              style={{ textAlign: "center", padding: "60px", color: "#718096" }}
            >
              No products found. Try adjusting your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
