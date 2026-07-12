const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const authMiddleware = require("../middleware/auth");
const authRole = require("../middleware/auth_role");

router.put("/cart", authMiddleware, authRole(2), async (req, res) => {
    const db = getDB();
    const userId = req.user.id;
    const cartInfo = req.body;
    try {
        for (const item of cartInfo) {
            const [prodD] = await db.execute(
                "SELECT * FROM product WHERE product_id = ?",
                [item.id]
            );
            const product = prodD[0];
            if (!product) {
                throw new Error(`Product ${item.id} not found.`);
            }
            if(item.qty > product.quantity) throw new Error("Manipulation Detected");
        }

        const [orderResult] = await db.execute(
            `INSERT INTO ord_er (buyer_id, sta_tus)
            VALUES (?, 'paid')`,
            [userId]
        );
            const orderId = orderResult.insertId;

        for(const item of cartInfo){
            const [prodD] = await db.execute(
                "SELECT * FROM product WHERE product_id = ?",
                [item.id]
            );
            const product = prodD[0];
            await db.execute(
                `insert into order_item(order_id, product_id, quantity, current_price, discount_percentage)
                values (?, ?, ?, ?, ?)`,
                [orderId, item.id, item.qty, product.price, product.discount_amount]
            );
            const remaining = product.quantity - item.qty;
            await db.execute(
                `UPDATE product 
                SET quantity = ? where product_id = ?`,
                [remaining, item.id]
            )
        }
         
        res.json({ message: "Payment Successfull" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
//cart.push({ ...product, qty });