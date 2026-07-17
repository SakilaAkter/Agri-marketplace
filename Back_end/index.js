const express = require('express');
const cors = require("cors");
const connectDB = require("./db");
const register = require("./routes/register.js");
const login = require("./routes/login.js");
const profile = require("./routes/profile.js")
const product = require("./routes/product.js")
const adminp = require("./routes/admin.js")
const tstatus = require("./routes/ban_unban.js")
const cart = require("./routes/add_to_cart.js")
const hero = require("./routes/hero.js")
const fdb = require("./routes/farmer_db.js")
const createproducts = require("./routes/createproduct.js")

const app = express();


app.use(express.json());
app.use(cors());
app.use("/", register);
app.use("/", login);
app.use("/", profile);
app.use("/", product);
app.use("/", adminp);
app.use("/", tstatus);
app.use("/", cart);
app.use("/", hero);
app.use("/", fdb);
app.use("/", createproducts);

connectDB();

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});