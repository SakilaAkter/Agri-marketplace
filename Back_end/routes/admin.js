const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const authMiddleware = require("../middleware/auth");
const authorizeRole = require("../middleware/auth_role");

router.get("/admindashboard", authMiddleware, authorizeRole(3), async (req, res) => {
    const db = getDB();

    try {
        const [farmers_c] = await db.execute(
            "SELECT count(user_id) as fmc FROM USERS_RENAMED_2 WHERE role_id = 1",
            []
        );

        const [consumers_c] = await db.execute(
            "select count(*) as cmc from USERS_RENAMED_2 where role_id = 2",
            []
        );

        const [products_c] = await db.execute(
            "SELECT count(*) as pdc FROM product",
            []
        );

        const [orders_c] = await db.execute(
            "SELECT count(*) as odc FROM ORD_ER",
            []
        );

        const dashboardData = {
            farmers: farmers_c[0].fmc,
            consumers: consumers_c[0].cmc,
            products: products_c[0].pdc,
            orders: orders_c[0].odc
        };

        return res.status(200).json(dashboardData);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });

    }
});


router.get("/farmerinfo", authMiddleware, authorizeRole(3), async (req, res) => {
    const db = getDB();

    try {
        const [farmers_c] = await db.execute(
            `with temp1 as (SELECT user_id, user_name, status, location FROM USERS_RENAMED_2  WHERE role_id = 1),
            temp2 as (select farmer_id as user_id, count(*) as pcnt from product where farmer_id in (select user_id from temp1) group by farmer_id),
            temp3 as (select user_id, location_name from temp1, location_dist where location_id = temp1.location)
            select user_id, user_name, status, pcnt, location_name from (temp1 left join temp2 using(user_id)) left join temp3 using(user_id)
            `
        );

        if (farmers_c.length < 0) {
            return res.status(404).json({
                message: "No Farmer"
            });
        }

        res.json(farmers_c);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });

    }
});


router.get("/consumerinfo", authMiddleware, authorizeRole(3), async (req, res) => {
    const db = getDB();

    try {
        const [consumers_c] = await db.execute(
            `with temp1 as (SELECT user_id, user_name, status, email FROM USERS_RENAMED_2  WHERE role_id = 2),
            temp2 as (select buyer_id as user_id, count(*) as ocnt from ord_er where buyer_id in (select user_id from temp1) group by buyer_id)
            select user_id, ocnt, user_name, email, status from temp1 left join temp2 using(user_id)
            `
        );

        if (consumers_c.length < 0) {
            return res.status(404).json({
                message: "No consumer"
            });
        }

        res.json(consumers_c);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });

    }
});


router.get("/productinfo", authMiddleware, authorizeRole(3), async (req, res) => {
    const db = getDB();

    try {
        const [product_c] = await db.execute(
            `select product_id, product_name, farmer_id, price, status, date_added from product order by date_added
            `
        );

        if (product_c.length < 0) {
            return res.status(404).json({
                message: "No product"
            });
        }

        res.json(product_c);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });

    }
});


router.get("/orderinfo", authMiddleware, authorizeRole(3), async (req, res) => {
    const db = getDB();

    try {
        const [Order_c] = await db.execute(
            `select ord_er.order_id, ord_er.buyer_id, ord_er.order_date, order_item.product_id, ord_er.sta_tus from ord_er
            join order_item using(order_id)
            `
        );

        /*if (product_c.length < 0) {
            return res.status(404).json({
                message: "No Order"
            });
        }*/

        res.json(Order_c);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });

    }
});





module.exports = router;