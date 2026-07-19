const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const authMiddleware = require("../middleware/auth");
const authorizeRole = require("../middleware/auth_role");

router.get("/orderinfofarmer", authMiddleware, authorizeRole(1), async (req, res) => {
    const db = getDB();

    try {
        const farmerId = req.user.id;

        const [rows] = await db.execute(
            `SELECT
                o.order_id,
                o.buyer_id,
                o.order_date,
                o.sta_tus,
                oi.quantity,
                oi.current_price,
                oi.discount_percentage,
                p.product_name
            FROM ord_er o
            JOIN order_item oi
                ON o.order_id = oi.order_id
            JOIN product p
                ON oi.product_id = p.product_id
            WHERE p.farmer_id = ?
            ORDER BY o.order_date DESC, o.order_id DESC`,
            [farmerId]
        );
        const orders = {};

        rows.forEach(row => {

            if (!orders[row.order_id]) {
                orders[row.order_id] = {
                    id: row.order_id,
                    date: row.order_date,
                    status: row.sta_tus,
                    buyer: row.buyer_id,
                    amount: 0,
                    items: []
                };
            }

            
            orders[row.order_id].items.push({
                name: row.product_name,
                qty: row.quantity,
                price:
                        Number(row.discount_percentage) > 0
                        ? Number(row.current_price - row.discount_percentage)
                        : Number(row.current_price)
            });

            orders[row.order_id].amount +=
                Number(row.quantity) * Number(row.discount_percentage) > 0
                        ? Number(row.current_price - row.discount_percentage)
                        : Number(row.current_price)
        });

        res.json(Object.values(orders));

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

router.post("/rejectorder", authMiddleware, authorizeRole(1), async (req, res) => {
    const db = getDB();

    try {
        const { order_id, statust } = req.body;

        if(statust === "accept"){
            await db.execute(
            `update ord_er set sta_tus = 'accepted' where order_id = ? and sta_tus = 'paid'`,
            [order_id]
        );
        }

        else{
        const [result] = await db.execute(
            `UPDATE ord_er
            SET sta_tus = 'rejected'
            WHERE order_id = ? AND sta_tus = 'paid'`,
            [order_id]
        );

        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "Order not found or cannot be rejected."
            });
        }
        const [items] = await db.execute(
            `SELECT product_id, quantity
            FROM order_item
            WHERE order_id = ?`,
            [order_id]
        );

        for (const item of items) {
            await db.execute(
                `UPDATE product
                SET quantity = quantity + ?
                WHERE product_id = ?`,
                [item.quantity, item.product_id]
            );
        }
    }

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

router.get("/myproducts", authMiddleware, authorizeRole(1), async (req, res) => {
    const db = getDB();

    try {
        const farmerId = req.user.id;

        const [rows] = await db.execute(
            `SELECT * from product join category_members on m_id = category_member_id join unit on product.unit_id = unit.unit_id 
            left join expired_product 
                ON product.product_id = expired_product.product_id where farmer_id = ? 
            order by date_added desc`,
            [farmerId]
        );
        res.json(rows);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


router.post("/expireproduct/:id", authMiddleware, authorizeRole(1), async (req, res) => {
        const db = getDB();
        try {
            const farmerId = req.user.id;
            const productId = req.params.id;

            const [product] = await db.execute(
                `SELECT product_id
                 FROM PRODUCT
                 WHERE product_id = ?
                 AND farmer_id = ?`,
                [productId, farmerId]
            );

            if (product.length === 0) {
                return res.status(404).json({
                    message: "Product not found."
                });
            }

            const [exists] = await db.execute(
                `SELECT product_id
                 FROM EXPIRED_PRODUCT
                 WHERE product_id = ?`,
                [productId]
            );

            if (exists.length > 0) {
                return res.status(400).json({
                    message: "Product already removed."
                });
            }

            await db.execute(
                `INSERT INTO EXPIRED_PRODUCT
                (product_id, expired_on)
                VALUES (?, now())`,
                [productId]
            );

            res.json({
                success: true,
                message: "Product removed successfully."
            });

        } catch (err) {

            console.error(err);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }
);

module.exports = router;