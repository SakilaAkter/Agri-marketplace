const express = require("express");
const router = express.Router();

const { getDB } = require("../db");
const authMiddleware = require("../middleware/auth");
const authorizeRole = require("../middleware/auth_role");

router.get("/customdeal/products", authMiddleware, authorizeRole(2), async (req, res) => {
    const db = getDB();

        try {
            const [rows] = await db.execute(
                `SELECT
                    p.product_id,
                    p.product_name,
                    p.price,
                    p.quantity,
                    u.unit_name,
                    f.user_id AS farmer_id,
                    f.user_name AS farmer_name
                FROM PRODUCT p
                JOIN USERS_RENAMED_2 f
                    ON p.farmer_id = f.user_id
                JOIN UNIT u
                    ON p.unit_id = u.unit_id
                WHERE
                    p.status='active'
                    AND f.status='active'
                ORDER BY p.product_name`
            );
            res.json(rows);
        }
        catch(err){
            console.error(err);
            res.status(500).json({message:"Server Error"});
        }
    }
);



router.post("/customdeal", authMiddleware, authorizeRole(2), async (req,res)=>{
    const db=getDB();

        try{
            const buyerId=req.user.id;
            const{
                product_id,
                agreed_price,
                quantity_per_day,
                start_date,
                end_date
            }=req.body;

            if(
                !product_id||
                !agreed_price||
                !quantity_per_day||
                !start_date||
                !end_date
            ){
                return res.status(400).json({
                    message:"Please fill all fields."
                });
            }

            const [product]=await db.execute(
                `SELECT
                    farmer_id,
                    price,
                    quantity,
                    status
                FROM PRODUCT
                WHERE product_id=?`,
                [product_id]
            );

            if(product.length===0){
                return res.status(404).json({ message:"Product not found."});

            }

            if(product[0].status!=="active"){
                return res.status(400).json({message:"Product unavailable."});
            }

            await db.execute(
                `INSERT INTO CUSTOM_DEAL(
                    farmer_id,
                    buyer_id,
                    product_id,
                    current_price,
                    agreed_price,
                    quantity_per_day,
                    start_date,
                    end_date,
                    status
                )
                VALUES(?,?,?,?,?,?,?,?,?)`,
                [
                    product[0].farmer_id,
                    buyerId,
                    product_id,
                    product[0].price,
                    agreed_price,
                    quantity_per_day,
                    start_date,
                    end_date,
                    "Pending"
                ]
            );

            res.json({
                success:true,
                message:"Custom deal request submitted."
            });
        }

        catch(err){
            console.error(err);
            res.status(500).json({message:"Server Error"});
        }
    }
);


router.get("/customdeal", authMiddleware, authorizeRole(2), async(req,res)=>{
    const db=getDB();
        try{
            const buyerId=req.user.id;
            const [rows]=await db.execute(
                `SELECT
                    cd.deal_id,
                    p.product_name,
                    u.user_name AS farmer_name,
                    cd.current_price,
                    cd.agreed_price,
                    cd.quantity_per_day,
                    cd.start_date,
                    cd.end_date,
                    cd.status
                FROM CUSTOM_DEAL cd
                JOIN PRODUCT p
                    ON cd.product_id=p.product_id
                JOIN USERS_RENAMED_2 u
                    ON cd.farmer_id=u.user_id
                WHERE cd.buyer_id=?
                ORDER BY cd.deal_id DESC`,
                [buyerId]
            );
            res.json(rows);
        }
        catch(err){
            console.error(err);
            res.status(500).json({message:"Server Error"});
        }
    }
);


module.exports=router;