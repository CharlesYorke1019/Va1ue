const jasonwebtoken = require('jsonwebtoken');
const authConfig = require('../config/authConfig');
const db = require('../models');
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["authorization"];

    if (!token) {
        return res.status(401).send({
            message: "No token provided"
        })
    };

    token = token.replace(/^Bearer\s+/, "");

    jasonwebtoken.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(403).send({
                message: "Unauthorized"
            })
        };

        req.email = decoded.email;
        next();
    })
};

const authJwt = {
    verifyToken: verifyToken
};

module.exports = authJwt;