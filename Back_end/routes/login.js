const express = require("express");
const router = express.Router();
const { getDB } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    const db = getDB();
    const {email0phone, password} = req.body;
    
    if(!email0phone || !password){
        return res.status(400).json({message: "All fields required"});
    }

    try{
        const [rows] = await db.execute(
            "SELECT * FROM USERS_RENAMED_2 WHERE phone = ? or email = ?",
            [email0phone, email0phone]
        ); 
        if (rows.length == 0) {
            return res.status(409).json({ message: "User doesn't exists" });
        } 

        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
                return res.status(401).json({message: "Password Incorrect"});
            }
            const token = jwt.sign(
                {id: user.user_id, email: user.email, phone: user.phone, role: user.role_id},
                "my_secret_key",
                {expiresIn: "1h"} 
            );
            res.json({
                message: "Login successful",
                token,
                role: user.role_id
            });
        } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }        

    });

module.exports = router;