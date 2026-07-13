const express = require("express");
const router = express.Router();
const { getDB } = require("../db");

router.get("/hero", async (req, res) => {
    const db = getDB();

    const [users] = await db.execute(
        "SELECT count(*) as userCount FROM USERS_RENAMED_2 where role_id = 1"
    );

    const [products] = await db.execute(
        "select count(*) as productCount from product"
    )

    res.json({
      userCount: users[0].userCount,
      productCount: products[0].productCount,
    });
});

module.exports = router;