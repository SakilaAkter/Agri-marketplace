const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    const db = getDB();

    const { user_name, phone, email, password, role_id, about , consumerType} = req.body;

    if (!user_name || !phone || !password || !role_id) {
        return res.status(400).json({ message: "All fields required" });
    }

    try {

 /*       const [tables] = await db.execute("SHOW TABLES");

const tableNames = tables.map(t => Object.values(t)[0]);

console.log("Tables:", tableNames);
                const [roleRows] = await db.execute("SELECT * FROM ROLE");
        console.log("ROLE TABLE DATA:", roleRows); */
       const [rows] = await db.execute(
            "SELECT user_id FROM USERS_RENAMED_2 WHERE phone = ?",
            [phone]
        ); 

       if (rows.length > 0) {
            return res.status(409).json({ message: "User already exists" });
        } 

        const hashedPassword = await bcrypt.hash(password, 10);

        if(Number(role_id) === 2){
            if (!consumerType || consumerType === "") {
                return res.status(400).json({
                error: "Consumer type is required"
                });
            }
        }

        await db.execute(
            `INSERT INTO USERS_RENAMED_2  
            (user_name, phone, email, password, role_id, about) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [user_name, phone, email, hashedPassword, role_id, about]
        );

        if(Number(role_id) === 2){
            const [bows] = await db.execute(
                "SELECT role_id, USER_ID FROM USERS_RENAMED_2 WHERE PHONE = ?",
                    [phone]
            );
            const user = bows[0];
            if (bows.length == 0 || user.role_id != 2) {
                return res.status(409).json({ message: "User doesn't exist" });
            }

            const user2 = user.USER_ID;
        //    console.log(user2,user, Number(consumerType));
            await db.execute(
                `INSERT INTO CONSUMER_RELATION 
                (user_id, consumer_type) 
                VALUES (?, ?)`,
                [user2, Number(consumerType)]
            ); 
        }

        res.json({ message: "User registered successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;