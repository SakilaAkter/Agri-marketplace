const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    const db = getDB();

    const { user_name, phone, email, password, role_id, about } = req.body;

    if (!user_name || !phone || !password || !role_id) {
        return res.status(400).json({ message: "All fields required" });
    }

    try {

 /*       const [tables] = await db.execute("SHOW TABLES");

const tableNames = tables.map(t => Object.values(t)[0]);

console.log("Tables:", tableNames);
                const [roleRows] = await db.execute("SELECT * FROM ROLE");
        console.log("ROLE TABLE DATA:", roleRows); */
       const [rows] = await db.execute(
            "SELECT user_id FROM USERS_RENAMED_2 WHERE phone = ?",
            [phone]
        ); 

       if (rows.length > 0) {
            return res.status(409).json({ message: "User already exists" });
        } 

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.execute(
            `INSERT INTO USERS_RENAMED_2  
            (user_name, phone, email, password, role_id, about) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [user_name, phone, email, hashedPassword, role_id, about]
        );

        res.json({ message: "User registered successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;