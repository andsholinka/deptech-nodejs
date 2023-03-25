const db = require('../models/index');
const admins = db.admins;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req, res, next) => {

    try {
        let token = req.headers['authorization'];
        if (!token) {
            return res.status(403).send({
                status: res.statusCode,
                message: "No token provided!"
            });
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    status: res.statusCode,
                    message: "Unauthorized!"
                });
            }
            req.user = decoded.data;
            next();
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: res.statusCode,
            message: "has no authority",
        })
    }
};

module.exports = auth;