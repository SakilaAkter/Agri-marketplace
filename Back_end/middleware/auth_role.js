function authorizeRole(requiredRole){
    return (req, res, next) => {
        const user = req.user;
        if(!user){
            return res.status(401).json({message: "Not logged in"});
        }

        if(user.role !== requiredRole){        //5==="5"  false; 5=="5" true;
            return res.status(403).json({message: "Access denied"});
        }

        next();
    };
}

module.exports = authorizeRole;