'use strict';

const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.getUser = async (req, res, next) => {
    if (!req.headers.authorization) {
        console.log('problem')
        next();
    }
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        const user = await User.findOne({
            attributes: [
                "id",
                "role",
            ],
            where: {
                id: decoded.id,
            },
        });

        req.user = user.dataValues;
        next();
    } catch (e) {
        next();
    }
};
