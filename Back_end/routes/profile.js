const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const authMiddleware = require("../middleware/auth");

router.get("/locations", async (req, res) => {
    const db = getDB();
    const [rows] = await db.execute(
        "SELECT location_id, location_name FROM location_dist"
    );
    res.json(rows);
});

router.get("/history", authMiddleware, async(req, res) =>{
    const db = getDB();
    try{
        const userID = req.user.id;
        const [rows1] = await db.execute(
            "select date_added, product_name from PRODUCT where farmer_id = ? ORDER BY date_added DESC LIMIT 5", 
            [userID]
        )
        const [rows2] = await db.execute(
            "select date from report where reporter_id = ? ORDER BY date DESC LIMIT 5",
            [userID]
        )
        const [rows3] = await db.execute(
            "select order_date from ORD_ER where buyer_id = ? ORDER BY order_date DESC LIMIT 5",
            [userID]
        )
        const [rows4] = await db.execute(
            "select product_name, old_price, new_price, changed_date from PRICE_HISTORY join product using(product_id) where product.farmer_id = ?",
            [userID]
        )
        const [rows5] = await db.execute(
            "select start_date from custom_deal where farmer_id = ? or buyer_id = ?",
            [userID, userID]
        )

        let historyData = [];

        rows1.forEach(item => {
            if (item.product_name && item.date_added) {
                historyData.push({
                    action: `Listed new product: ${item.product_name}`,
                    date: item.date_added
                });
            }
        });

        rows2.forEach(item => {
            if (item.date) {
                historyData.push({
                    action: "Submitted a report",
                    date: item.date
                });
            }
        });

        rows3.forEach(item => {
            if (item.order_date) {
                historyData.push({
                    action: "Placed a new order",
                    date: item.order_date
                });
            }
        });

        rows4.forEach(item => {
            if (
                item.product_name &&
                item.old_price != null &&
                item.new_price != null &&
                item.changed_date
            ) {
                historyData.push({
                    action: `Updated price: ${item.product_name} ${item.old_price} Tk → ${item.new_price} Tk`,
                    date: item.changed_date
                });
            }
        });

        rows5.forEach(item => {
            if (item.start_date) {
                historyData.push({
                    action: "Started a custom deal",
                    date: item.start_date
                });
            }
        });

        historyData.sort((a, b) => new Date(b.date) - new Date(a.date));
        historyData = historyData.slice(0, 5);

        res.json({
            success: true,
            history: historyData
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            message: "Failed to fetch history"
        });
    }
});


router.get("/profile", authMiddleware, async (req, res) => {
    const db = getDB();

    try {
        const userId = req.user.id;
        const [rows] = await db.execute(
            "SELECT user_name, email, phone, role_id, date_added, about, location FROM USERS_RENAMED_2 WHERE user_id = ?",
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
    const { name, phone, email, about, location } = req.body;
    try {
        await db.execute(
            `UPDATE USERS_RENAMED_2 
             SET user_name = ?, phone = ?, email = ?, about = ?, location = ? 
             WHERE user_id = ?`,
            [name, phone, email, about, location, userId]
        );
        res.json({ message: "Profile updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;