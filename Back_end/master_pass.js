const connectDB = require("./db");
const bcrypt = require("bcrypt");
const { getDB } = require("./db");


async function setMasterPassword() {
    await connectDB();
    const db = getDB();
    const masterPassword = "Crow_Lake";
    const hash = await bcrypt.hash(masterPassword, 10);

    try{
        await db.execute(
                `REPLACE INTO master_p (id, master_pass)
                    VALUES (1, ?);`,
                [hash]
            );
        console.log("Master password saved successfully.");
        process.exit(0);
    }catch (err) {
            console.log(err);
            process.exit(1);
    }
}
setMasterPassword();