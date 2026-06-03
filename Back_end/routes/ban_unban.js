const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const authMiddleware = require("../middleware/auth");
const authorizeRole = require("../middleware/auth_role");

router.post("/tstatus", authMiddleware, authorizeRole(3), async (req, res) => {
    const db = getDB();

    try {
       const { user_id } = req.body;
       const [rows] = await db.execute(
            "SELECT status FROM USERS_RENAMED_2 WHERE user_id = ?",
            [user_id]
        ); 

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const status2 = rows[0].status;

        if(status2 === 'active'){
            await db.execute(
            "UPDATE USERS_RENAMED_2 SET status = 'banned' WHERE user_id = ?",
            [user_id]
            );
            await db.execute(`insert into bnb (status, user_id) values (?, ?)`,
            ['banned', user_id]);
            res.json({ message: "User banned successfully" });
        }

        else{
            await db.execute(
            "UPDATE USERS_RENAMED_2 SET status = 'active' WHERE user_id = ?",
            [user_id]
            );
            await db.execute(`insert into bnb (status, user_id) values (?, ?)`,
            ['active', user_id]);
            res.json({ message: "User activated successfully" });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

router.post("/tstatus2", authMiddleware, authorizeRole(3), async (req, res) => {
    const db = getDB();

    try {
       const { product_id } = req.body;
       const [rows] = await db.execute(
            "SELECT status FROM product WHERE product_id = ?",
            [product_id]
        ); 

        if (rows.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        const status2 = rows[0].status;

        if(status2 === 'active'){
            await db.execute(
            "UPDATE product SET status = 'banned' WHERE product_id = ?",
            [product_id]
            );
            await db.execute(`insert into bnb (status, product_id) values (?, ?)`,
            ['banned', product_id]);
            res.json({ message: "Product banned successfully" });
        }

        else{
            await db.execute(
            "UPDATE product SET status = 'active' WHERE product_id = ?",
            [product_id]
            );
            await db.execute(`insert into bnb (status, product_id) values (?, ?)`,
            ['active', product_id]);
            res.json({ message: "product activated successfully" });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;