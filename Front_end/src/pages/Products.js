import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const allProducts = [
  {
    id: 1,
    name: "Tomato",
    price: 20,
    unit: "kg",
    location: "Jessore",
    farmer: "Rahim Farm",
    farmerInitials: "RF",
    category: "Vegetables",
    badge: "Fresh",
    trend: "up",
    trendPct: "+12%",
    aiHint: "Price rising due to low supply this week — buy now.",
    stock: 240,
    minOrder: 5,
    discount: "5% off 50kg+",
    listed: "Jan 10, 2026",
    desc: "Farm-fresh tomatoes grown organically in Jessore. Harvested daily and delivered directly to buyers. No pesticides used.",
    img: "https://images.unsplash.com/photo-1561136594-7f68413baa99?w=400&q=75",
    gallery: [
      "https://images.unsplash.com/photo-1561136594-7f68413baa99?w=600&q=80",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&q=80",
      "https://images.unsplash.com/photo-1543258103-a62bdc069871?w=600&q=80",
    ],
  },
  {
    id: 2,
    name: "Potato",
    price: 15,
    unit: "kg",
    location: "Rangpur",
    farmer: "Karim Farm",
    farmerInitials: "KF",
    category: "Vegetables",
    badge: null,
    trend: "down",
    trendPct: "-8%",
    aiHint: "Price dropping — good time to stock up in bulk.",
    stock: 500,
    minOrder: 10,
    discount: "None",
    listed: "Jan 8, 2026",
    desc: "High quality potatoes from Rangpur. Ideal for restaurants and grocery shops. Freshly dug and cleaned.",
    img: "https://images.unsplash.com/photo-1508313880080-c4bef0730395?w=400&q=75",
    gallery: [
      "https://images.unsplash.com/photo-1508313880080-c4bef0730395?w=600&q=80",
      "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=600&q=80",
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80",
    ],
  },
  {
    id: 3,
    name: "Onion",
    price: 25,
    unit: "kg",
    location: "Pabna",
    farmer: "Hasan Farm",
    farmerInitials: "HF",
    category: "Vegetables",
    badge: "Popular",
    trend: "stable",
    trendPct: "0%",
    aiHint: "Price has been stable for 2 weeks.",
    stock: 180,
    minOrder: 5,
    discount: "10% off 100kg+",
    listed: "Jan 5, 2026",
    desc: "Fresh onions from Pabna. Our most popular product with consistent quality year-round.",
    img: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&q=75",
    gallery: [
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&q=80",
      "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=600&q=80",
      "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=600&q=80",
    ],
  },
  {
    id: 4,
    name: "Cauliflower",
    price: 30,
    unit: "kg",
    location: "Bogura",
    farmer: "Salam Farm",
    farmerInitials: "SF",
    category: "Vegetables",
    badge: "Fresh",
    trend: "up",
    trendPct: "+18%",
    aiHint: "Seasonal demand rising — price may go up further.",
    stock: 80,
    minOrder: 3,
    discount: "None",
    listed: "Jan 9, 2026",
    desc: "Fresh cauliflower picked this morning from Bogura farms. Perfect for restaurants and bulk buyers.",
    img: "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=600&q=80",
      "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?w=600&q=80",
    ],
  },
  {
    id: 5,
    name: "Carrot",
    price: 35,
    unit: "kg",
    location: "Dinajpur",
    farmer: "Ali Farm",
    farmerInitials: "AF",
    category: "Vegetables",
    badge: null,
    trend: "stable",
    trendPct: "0%",
    aiHint: "Steady supply from Dinajpur keeps price consistent.",
    stock: 120,
    minOrder: 5,
    discount: "None",
    listed: "Jan 7, 2026",
    desc: "Sweet crunchy carrots from Dinajpur. Great for bulk buyers, restaurants, and juice bars.",
    img: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&q=75",
    gallery: [
      "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=600&q=80",
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&q=80",
      "https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?w=600&q=80",
    ],
  },
  {
    id: 6,
    name: "Rice (Aman)",
    price: 55,
    unit: "kg",
    location: "Sylhet",
    farmer: "Mia Farm",
    farmerInitials: "MF",
    category: "Grains",
    badge: "Seasonal",
    trend: "up",
    trendPct: "+22%",
    aiHint: "Post-harvest price rising fast — secure stock now.",
    stock: 1000,
    minOrder: 20,
    discount: "3% off 200kg+",
    listed: "Dec 20, 2025",
    desc: "Premium Aman rice from Sylhet. Seasonal harvest with limited stock. Aromatic and high quality.",
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=75",
    gallery: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80",
      "https://images.unsplash.com/photo-1536304993881-ff86e33cbef8?w=600&q=80",
      "https://images.unsplash.com/photo-1604908176997-4316d0c3f7f4?w=600&q=80",
    ],
  },
  {
    id: 7,
    name: "Green Pepper",
    price: 40,
    unit: "kg",
    location: "Khulna",
    farmer: "Alam Farm",
    farmerInitials: "ALF",
    category: "Vegetables",
    badge: "Fresh",
    trend: "down",
    trendPct: "-5%",
    aiHint: "Bumper harvest in Khulna pushing prices down.",
    stock: 90,
    minOrder: 3,
    discount: "None",
    listed: "Jan 9, 2026",
    desc: "Fresh green peppers from Khulna. Crisp and flavorful, ideal for salads and cooking.",
    img: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&q=75",
    gallery: [
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&q=80",
      "https://images.unsplash.com/photo-1596591868231-05e4680df929?w=600&q=80",
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&q=80",
    ],
  },
  {
    id: 8,
    name: "Garlic",
    price: 80,
    unit: "kg",
    location: "Rajshahi",
    farmer: "Islam Farm",
    farmerInitials: "IF",
    category: "Spices",
    badge: null,
    trend: "up",
    trendPct: "+15%",
    aiHint: "Import restrictions raising garlic prices nationwide.",
    stock: 60,
    minOrder: 2,
    discount: "None",
    listed: "Jan 6, 2026",
    desc: "Premium quality garlic from Rajshahi. Strong aroma and flavor. Dry-cured for longer shelf life.",
    img: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80",
      "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=600&q=80",
      "https://images.unsplash.com/photo-1501420193253-7af0789765f3?w=600&q=80",
    ],
  },
  {
    id: 9,
    name: "Brinjal",
    price: 18,
    unit: "kg",
    location: "Jessore",
    farmer: "Dewan Farm",
    farmerInitials: "DF",
    category: "Vegetables",
    badge: "Fresh",
    trend: "stable",
    trendPct: "0%",
    aiHint: "Consistent supply — price expected to hold.",
    stock: 150,
    minOrder: 5,
    discount: "None",
    listed: "Jan 10, 2026",
    desc: "Fresh brinjal picked daily from Jessore farms. Deep purple, firm and fresh.",
    img: "https://images.pexels.com/photos/321551/pexels-photo-321551.jpeg?w=400&h=300&fit=crop",
    gallery: [
      "https://images.pexels.com/photos/321551/pexels-photo-321551.jpeg?w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/7511774/pexels-photo-7511774.jpeg?w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/4033636/pexels-photo-4033636.jpeg?w=600&h=400&fit=crop",
    ],
  },

  {
    id: 10,
    name: "Orange",
    price: 60,
    unit: "kg",
    location: "Khulna",
    farmer: "Haque Farm",
    farmerInitials: "HQF",
    category: "Fruits",
    badge: null,
    trend: "down",
    trendPct: "-10%",
    aiHint:
      "New harvest season dropping orange prices — good time to buy in bulk.",
    stock: 200,
    minOrder: 5,
    discount: "None",
    listed: "Jan 8, 2026",
    desc: "Sweet and juicy oranges from Khulna. High vitamin C content. Perfect for restaurants, juice producers and grocery shops.",
    img: "https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?w=400&h=300&fit=crop",
    gallery: [
      "https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/952360/pexels-photo-952360.jpeg?w=600&h=400&fit=crop",
      "https://images.pexels.com/photos/4110351/pexels-photo-4110351.jpeg?w=600&h=400&fit=crop",
    ],
  },
  {
    id: 11,
    name: "Red Chilli",
    price: 90,
    unit: "kg",
    location: "Bogura",
    farmer: "Reza Farm",
    farmerInitials: "RF2",
    category: "Spices",
    badge: "Seasonal",
    trend: "up",
    trendPct: "+20%",
    aiHint: "Dry weather reducing yields — prices expected to climb.",
    stock: 45,
    minOrder: 2,
    discount: "None",
    listed: "Jan 4, 2026",
    desc: "Fiery red chillies from Bogura. Sun-dried and packed fresh. High heat level.",
    img: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=400&q=75",
    gallery: [
      "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&q=80",
      "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=600&q=80",
      "https://images.unsplash.com/photo-1526346698789-22fd84314424?w=600&q=80",
    ],
  },
  {
    id: 12,
    name: "Spinach",
    price: 12,
    unit: "kg",
    location: "Dhaka",
    farmer: "Noor Farm",
    farmerInitials: "NF",
    category: "Vegetables",
    badge: "Fresh",
    trend: "down",
    trendPct: "-15%",
    aiHint: "Oversupply near Dhaka — best price right now.",
    stock: 300,
    minOrder: 3,
    discount: "None",
    listed: "Jan 10, 2026",
    desc: "Tender fresh spinach leaves from Dhaka district. Washed and packed. Ready to cook.",
    img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=75",
    gallery: [
      "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=600&q=80",
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&q=80",
    ],
  },
];

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
    const exists = updated.find((i) => i.id === product.id);
    if (exists) exists.qty += 1;
    else updated.push({ ...product, qty: 1 });
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
          <option>Vegetables</option>
          <option>Fruits</option>
          <option>Grains</option>
          <option>Spices</option>
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
          <option>Jessore</option>
          <option>Rangpur</option>
          <option>Pabna</option>
          <option>Bogura</option>
          <option>Dinajpur</option>
          <option>Khulna</option>
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
