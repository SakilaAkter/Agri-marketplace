import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const FALLBACK =
  "https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?w=400&h=300&fit=crop";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  const updateStorage = (items) => {
    setCart(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const increaseQty = (id) => {
    const updated = cart.map((item) => {
      if (item.id !== id) return item;

      return {
        ...item,
        qty: Math.min(item.qty + 1, Number(item.stock)),
      };
    });

    updateStorage(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item.id === id
          ? {
              ...item,
              qty: item.qty - 1,
            }
          : item
      )
      .filter((item) => item.qty > 0);

    updateStorage(updated);
  };

  const removeItem = (id) => {
    updateStorage(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    updateStorage([]);
  };

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cart]);


  const handleCheckout = async () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    try {
        const res = await fetch("http://localhost:3000/cart", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // if using JWT
        },
        body: JSON.stringify(cart),
        });
        const data = await res.json();
        if (res.ok) {
        alert(data.message);
        localStorage.removeItem("cart");
        navigate("/");
        } else {
        alert(data.message);
        }
    } catch (err) {
        console.error(err);
        alert("Checkout failed.");
    }
    };
  return (
    <div style={{ background: "#f7faf8", minHeight: "100vh" }}>
      <Navbar />

      <div
        style={{
          maxWidth: "1100px",
          margin: "30px auto",
          padding: "0 20px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>🛒 Shopping Cart</h2>

        {cart.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: "60px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h3>Your cart is empty</h3>

            <button
              onClick={() => navigate("/products")}
              style={{
                marginTop: "20px",
                padding: "10px 24px",
                border: "none",
                background: "#166534",
                color: "#fff",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "25px",
            }}
          >
            {/* Left */}
            <div>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "18px",
                    background: "#fff",
                    padding: "15px",
                    borderRadius: "12px",
                    marginBottom: "15px",
                    alignItems: "center",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    onError={(e) => (e.target.src = FALLBACK)}
                    style={{
                      width: "110px",
                      height: "90px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "18px",
                      }}
                    >
                      {item.name}
                    </h3>

                    <div
                      style={{
                        color: "#666",
                        fontSize: "14px",
                        marginTop: "5px",
                      }}
                    >
                      {item.location} • {item.farmer}
                    </div>

                    <div
                      style={{
                        color: "#166534",
                        fontWeight: "bold",
                        marginTop: "8px",
                      }}
                    >
                      ৳ {item.price}/{item.unit}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <button onClick={() => decreaseQty(item.id)}>-</button>

                    <strong>{item.qty}</strong>

                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>

                  <div
                    style={{
                      width: "120px",
                      textAlign: "right",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                    >
                      ৳ {(item.price * item.qty).toFixed(2)}
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        border: "none",
                        background: "#ef4444",
                        color: "#fff",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                height: "fit-content",
                border: "1px solid #e5e7eb",
              }}
            >
              <h3>Order Summary</h3>

              <hr />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "15px 0",
                }}
              >
                <span>Items</span>
                <span>{cart.length}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "15px 0",
                }}
              >
                <span>Subtotal</span>
                <strong>৳ {subtotal.toFixed(2)}</strong>
              </div>

              <hr />

              <button
                onClick={handleCheckout}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#166534",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginTop: "20px",
                }}
              >
                Proceed to Checkout
              </button>

              <button
                onClick={clearCart}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;