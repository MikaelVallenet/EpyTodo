const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                return res.status(498).json({"msg":"Token is not valid"});
            }
            req.user = user["id"]
            next();
        });
    } else {
        res.status(498).json({"msg":"No token , authorization denied"});
    }
};