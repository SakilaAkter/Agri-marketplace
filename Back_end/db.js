require('dotenv').config();

const mysql = require('mysql2/promise');
const fs = require('fs');  //file system

let db;      //declaring variable not assigning value

async function connectDB() {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        ca: fs.readFileSync(process.env.DB_SSL_CA)
      }
    });

    console.log("Connected to TiDB database");
    return db;

  } catch (err) {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
module.exports.getDB = () => db;