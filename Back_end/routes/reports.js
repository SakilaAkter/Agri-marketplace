const express = require("express");
const router = express.Router();

const { getDB } = require("../db");
const authMiddleware = require("../middleware/auth");
const authorizeRole = require("../middleware/auth_role");

router.post("/report", authMiddleware, authorizeRole(1), async (req, res) => {
        const db = getDB();
        try {
            const reporterId = req.user.id;
            const {
                report_type,
                subject,
                description,
                order_id
            } = req.body;

            if (!report_type || !subject || !description) {
                return res.status(400).json({
                    message: "Please fill all required fields."
                });
            }

            if (order_id) {
                const [order] = await db.execute(
                    `SELECT order_id
                     FROM ORD_ER
                     WHERE order_id = ?`,
                    [order_id]
                );
                if (order.length === 0) {
                    return res.status(404).json({
                        message: "Order not found."
                    });
                }
            }

            await db.execute(
                `INSERT INTO REPORT
                (
                    reporter_id,
                    order_id,
                    report_type,
                    subject,
                    description,
                    sta_tus
                )
                VALUES
                (?, ?, ?, ?, ?, ?)`,

                [
                    reporterId,
                    order_id || null,
                    report_type,
                    subject,
                    description,
                    "Submitted"
                ]
            );

            res.json({
                success: true,
                message: "Report submitted successfully."
            });

        }

        catch (err) {

            console.error(err);

            res.status(500).json({
                message: "Server Error"
            });

        }

    }
);


router.get("/report", authMiddleware, authorizeRole(1), async (req, res) => {
        const db = getDB();
        try {
            const reporterId = req.user.id;
            const [rows] = await db.execute(
                `SELECT
                    report_id,
                    order_id,
                    report_type,
                    subject,
                    description,
                    sta_tus,
                    date
                FROM REPORT
                WHERE reporter_id = ?
                ORDER BY report_id DESC`,
                [reporterId]
            );
            res.json(rows);
        }
        catch (err) {
            console.error(err)
            res.status(500).json({
                message: "Server Error"
            });
        }
    }
);

module.exports = router;