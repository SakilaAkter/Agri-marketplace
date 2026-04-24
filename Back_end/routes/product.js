const express = require("express");
const router = express.Router();
const { getDB } = require("../db");

router.get("/product", async (req, res) => {
    const db = getDB();

    try {
        const [rows] = await db.execute(`
            SELECT 
                product.product_id AS id,
                product.product_name AS name,
                product.price AS price,
                product.discount_amount AS discount,
                product.discount_for_percent AS discount_avail_if,
                product.date_added AS listed,
                product.description AS product_desc,
                product.min_sell_amount AS minOrder,
                product.quantity AS stock,
                location_dist.location_name AS location,
                users_renamed_2.user_name AS farmer,
                category_members.image_link AS img,
                unit.unit_name AS unit

            FROM product

            JOIN USERS_RENAMED_2 
                ON users_renamed_2.user_id = product.farmer_id

            JOIN location_dist 
                ON users_renamed_2.location = location_dist.location_id

            JOIN category 
                ON product.category_id = category.category_id

            JOIN unit 
                ON product.unit_id = unit.unit_id

            JOIN category_members
                ON product.category_member_id = category_members.M_id

            LEFT JOIN expired_product 
                ON product.product_id = expired_product.product_id

            ORDER BY product.date_added DESC
        `);

        if (rows.length === 0) {
            return res.status(404).json({
                message: "No product available"
            });
        }

        res.json(rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Database error"
        });
    }
        /*
        SELECT * 
        FROM product
        ORDER BY date_added DESC
        LIMIT 10;
        */
});

module.exports = router;