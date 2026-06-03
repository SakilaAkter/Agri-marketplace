


import React, { useState } from "react";
import "./Predictor.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

function Predictor() {
  const [product, setProduct] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [forecastData, setForecastData] = useState([]);

  const handlePredict = async () => {
    if (!product || !location || !date) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      // PRICE PREDICTION
      const response = await fetch("http://127.0.0.1:5001/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product,
          location,
          date
        })
      });

      const data = await response.json();

      if (data.status === "success") {
        setResult({
          price: data.prediction,
          season: data.season
        });

        // LOAD FORECAST FOR SELECTED PRODUCT & LOCATION
        const forecastResponse = await fetch(
          `http://127.0.0.1:5001/forecast?product=${product}&location=${location}`
        );

        const forecastJson = await forecastResponse.json();

        if (forecastJson.status === "success") {
          setForecastData(forecastJson.forecast);
        }
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Could not connect to backend. Make sure Flask server is running!");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <video className="bg-video" autoPlay loop muted playsInline>
        <source src="/background.mp4" type="video/mp4" />
      </video>

      <h1 className="title">Future Price Predictor</h1>

      <div className="form-card">
        <div className="form-group">
          <label>Product</label>
          <select value={product} onChange={(e) => setProduct(e.target.value)}>
            <option value="">Select Product</option>
            <option value="Rice">Rice</option>
            <option value="Green Chilli">Green Chilli</option>
            <option value="Onion">Onion</option>
            <option value="Potato">Potato</option>
            <option value="Tomato">Tomato</option>
          </select>
        </div>

        <div className="form-group">
          <label>Location</label>
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">Select Location</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chittagong">Chittagong</option>
            <option value="Rajshahi">Rajshahi</option>
            <option value="Sylhet">Sylhet</option>
            <option value="Khulna">Khulna</option>
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button
          className="predict-btn"
          onClick={handlePredict}
          disabled={loading}
        >
          {loading ? "Calculating..." : "Predict Price"}
        </button>
      </div>

      {result && (
        <div className="result-card">
          <h2>Prediction Result</h2>
          <p>
            Predicted price for <strong>{product}</strong> in{" "}
            <strong>{location}</strong> is:
          </p>
          <p className="price-text">৳{result.price}</p>
          <small>
            Detected Season: <strong>{result.season}</strong>
          </small>
        </div>
      )}

      {forecastData.length > 0 && (
        <div className="graph-card">
          <h2>
            {product} Forecast in {location}
          </h2>
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#ff0000"
                  strokeWidth={3}
                  name="Predicted Price"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default Predictor;