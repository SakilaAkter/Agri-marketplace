const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const authMiddleware = require("../middleware/auth");

router.get("/profile", authMiddleware, async (req, res) => {
    const db = getDB();

    try {
        const userId = req.user.id;
        const [rows] = await db.execute(
            "SELECT user_name, email, phone, role_id, date_added, about FROM USERS_RENAMED_2 WHERE user_id = ?",
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const [aows] = await db.execute(
            "SELECT role_name FROM ROLE WHERE role_id = ?",
            [rows[0].role_id]
        )

        const [prod_count] = await db.execute(
            "SELECT count(product_id) as cnt FROM product WHERE farmer_id = ?",
            [userId]
        )

        const [order_count] = await db.execute(
            "SELECT count(order_id) as cnt2 FROM ORDER_ITEM WHERE product_id in (SELECT PRODUCT_ID FROM product where farmer_id = ? )",
            [userId]
        )

        const [act_deal] = await db.execute(
            "SELECT count(deal_id) as cnt3 FROM custom_deal where (farmer_id = ? or buyer_id = ?) and status is not null",
            [userId, userId]
        )
        res.json({...rows[0], role_name: aows[0]?.role_name, product_count: prod_count[0]?.cnt, orders: order_count[0]?.cnt2, active_deal: act_deal[0]?.cnt3});

    } catch (err) {
        res.status(500).json({
            message: err.message
        });

    }
});

router.post("/change-password", authMiddleware, async (req, res) => {
    const db = getDB();
    const userId = req.user.id;
    const { current, newPw } = req.body;
    try {
        const [rows] = await db.execute(
            "SELECT password FROM USERS_RENAMED_2 WHERE user_id = ?",
            [userId]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const bcrypt = require("bcrypt");
        const isMatch = await bcrypt.compare(current, rows[0].password);
        if (!isMatch) {
            return res.status(401).json({ message: "Current password is wrong" });
        }
        const hashed = await bcrypt.hash(newPw, 10);
        await db.execute(
            "UPDATE USERS_RENAMED_2 SET password = ? WHERE user_id = ?",
            [hashed, userId]
        );
        res.json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/profile", authMiddleware, async (req, res) => {
    const db = getDB();
    const userId = req.user.id;
    const { name, phone, email, about } = req.body;
    try {
        await db.execute(
            `UPDATE USERS_RENAMED_2 
             SET user_name = ?, phone = ?, email = ?, about = ? 
             WHERE user_id = ?`,
            [name, phone, email, about, userId]
        );
        res.json({ message: "Profile updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;