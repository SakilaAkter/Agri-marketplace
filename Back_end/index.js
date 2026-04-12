const express = require('express');
const cors = require("cors");
const connectDB = require("./db");
const register = require("./routes/register.js");
const login = require("./routes/login.js");

const app = express();


app.use(express.json());
app.use(cors());
app.use("/", register);
app.use("/", login);

connectDB();

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});