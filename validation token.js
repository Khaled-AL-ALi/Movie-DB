const jwt = require('jsonwebtoken');

module.exports= function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.send("access denied");
    try {
        const verify = jwt.verify(token, process.env.tokenway);
        req.user = verify;
        next();
    }
    catch (err) {
        res.status(400).send("invalid token");
    }
}