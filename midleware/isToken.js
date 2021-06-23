'use strict';

const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(403).json({
            message: "you need to be logged in to visit this route",
            success: false,
        });
        return;
    }
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        const user = await User.findOne({
            attributes: [
                "id",
                "fullName",
                "login",
                "email",
                "avatar",
                "role"
            ],
            where: {
                id: decoded.id,
            },
        });

        req.user = user.dataValues;
        next();
    } catch (e) {
        res.status(403).json({
            message: "jwt expired!",
            success: false,
        });
    }
};
