const express = require("express");
const router = express.Router();

const { getDB } = require("../db");
const authMiddleware = require("../middleware/auth");
const authorizeRole = require("../middleware/auth_role");

router.post("/addproduct", authMiddleware, authorizeRole(1), async (req, res) => {
    const db = getDB();

    try {
        const {
            product_name,
            category_id,
            category_member_id,
            unit_id,
            quantity,
            price,
            min_sell_amount,
            discount_amount,
            discount_for_percent,
            description
        } = req.body;

        if (
            !product_name ||
            !category_id ||
            !category_member_id ||
            !unit_id ||
            !quantity ||
            !price ||
            !min_sell_amount
        ) {
            return res.status(400).json({
                message: "Please fill in all required fields."
            });
        }

        if((!discount_amount && discount_for_percent) || (discount_amount && !discount_for_percent) || (discount_amount === '0' && discount_for_percent === '0')){
        return res.status(400).json({
                message: "Please fill in all required fields."
            });     
    }



        // Validate category
        const [category] = await db.execute(
            `SELECT category_id
             FROM category
             WHERE category_id = ?`,
            [category_id]
        );

        if (category.length === 0) {
            return res.status(400).json({
                message: "Invalid category."
            });
        }

        // Validate unit
        const [unit] = await db.execute(
            `SELECT unit_id
             FROM unit
             WHERE unit_id = ?`,
            [unit_id]
        );

        if (unit.length === 0) {
            return res.status(400).json({
                message: "Invalid unit."
            });
        }

        // Validate category member belongs to category
        const [member] = await db.execute(
            `SELECT M_id
             FROM category_members
             WHERE M_id = ?
             AND M_category_id = ?`,
            [category_member_id, category_id]
        );

        if (member.length === 0) {
            return res.status(400).json({
                message: "Invalid category member."
            });
        }

        // Get farmer location
        const [user] = await db.execute(
            `SELECT location
             FROM users_renamed_2
             WHERE user_id = ?`,
            [req.user.id]
        );

        const location = user[0].location;

        await db.execute(
            `INSERT INTO product
            (
                product_name,
                farmer_id,
                category_id,
                category_member_id,
                unit_id,
                price,
                quantity,
                min_sell_amount,
                discount_amount,
                discount_for_percent,
                description,
                location
            )
            VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                product_name,
                req.user.id,
                category_id,
                category_member_id,
                unit_id,
                price,
                quantity,
                min_sell_amount,
                discount_amount || null,
                discount_for_percent || null,
                description || null,
                location
            ]
        );

        res.status(201).json({
            message: "Product added successfully."
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;