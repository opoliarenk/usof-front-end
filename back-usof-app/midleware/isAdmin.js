'use strict';

const asyncHand = require('../midleware/asyncHand');

exports.isAdmin = asyncHand(async (req, res, next) => {
    if (req.user.role === 'admin') {
        console.log('yes -> admin');
        next();
    } else {
        res.status(403).json({
            message: "permission denied -> admin",
            success: false,
        });
    }
});
