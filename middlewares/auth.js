const jwt = require('jsonwebtoken');

function auth(req , res , next) {

    try {
        
        const token = req.cookies.token;
        if(!token) {
            res.status(401).json({msg : "Unauthorized"})
        }
        
        const verified = jwt.verify(token , process.env.KEY);
        req.user = verified.user;

        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({msg : "Unauthorized"})
    }
}

module.exports = auth;