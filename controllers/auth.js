'use strict';

require('dotenv').config();

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const asyncHand = require('../midleware/asyncHand');
const isEmail = require('isemail');
const { randStr } = require('../midleware/randStr');
const jwt = require("jsonwebtoken");
const sendMail = require('../midleware/sendMail');

exports.register = asyncHand(async (req, res) => {
    const {login, email, password, fullName, passConfirm} = req.body;
    const checkLogin = await User.findOne({where: {login: login}});
    const checkEmail = await User.findOne({where: {email: email}});
    const validEmail = isEmail.validate(email, {errorLevel: false});

    if (checkLogin) {
        res.status(200).send({
            success: false,
            message: 'User with that login already exists',
        });

        return ;
    }
    if (checkEmail) {
        res.status(200).send({
            success: false,
            message: 'User with that email already exists',
        });

        return ;
    }
    if (!validEmail) {
        res.status(200).send({
            success: false,
            message: 'Incorrect email',
        });

        return;
    }
    if (password !== passConfirm) {
        res.status(200).send({
            success: false,
            message: 'confirm your password'
        });

        return;
    }

    const confirmStr = randStr();

    await User.create({
        login: login,
        password: await bcrypt.hash(password, saltRounds),
        fullName: fullName,
        email: email,
        confirmed: false,
        confirmStr: confirmStr,
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });

    const message = {
        to: req.body.email,
        subject: 'Confirm email',
        html: `<h2>Congrats! You're registered on USOF<h2>
                    <a href="http://localhost:8080/api/auth/confirm/${confirmStr}  "> Go to this link for confirm you registration!</a>
                    <br>
                    <i>Don't repeat this mail!</i>`
    }

    sendMail(message);
    res.status(200).json({
        success: true,
        data: confirmStr,
        message: 'Account created successfully',
    });

    return;
});

exports.login = asyncHand(async (req, res) => {
    const {login, password} = req.body;
    const user = await User.findOne({where: {
            login: login
        }});

    if (!user || !await bcrypt.compare(password, user.password)) {
        res.status(200).send({
            success: false,
            message: 'login or password is incorrect'
        });

        return;
    }
    if (!user.confirmed) {
        res.status(200).send({
            success: false,
            message: 'please confirm email'
        });

        return;
    }
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: 18000,
    });

    res.status(200).json({ success: true, data: token });
});


exports.confirmEmail = async (req, res) =>{
    const user = await User.findOne({where: {confirmStr: req.params.code}});

    if (user) {
        let confirm = {confirmed: true};
        await User.update(confirm, {where: ({id: user.id})});

        res.status(200).send({
            success: true,
            message:'email confirmed'
        });

        return;
    } else {
        res.status(200).send({
            success: false,
            message:'user not found'
        });

        return;
    }
}

exports.resetPass = asyncHand(async (req, res, next) => {
    const {email} = req.body;
    const user = await User.findOne({where: {email: email}});
    const resConfirmStr = randStr();

    if (user) {
        await User.update({
            resetToken: resConfirmStr,
            expires: Date.now() + 36000
        }, {where: {id: user.id}});

        const message = {
            to: email,
            subject: 'Password reset request',
            html: `<h2>To change password press the link<h2>
                    <a href="http://localhost:8080/api/auth/password-reset/${resConfirmStr}"> Change password </a>
                    <br>
                    <i>Don't repeat this mail!</i>`
        }
        sendMail(message);
        res.status(200).send({
            success: false,
            message:`password reset link send ${resConfirmStr}`
        });
    } else {
        res.status(200).send({
            success: false,
            message:'user not found'
        })
    }
});

exports.resetForm = async (req, res) => {
    res.status(200).send(`
<div><form method="POST" action="http://localhost:8080/api/auth/password-reset/${req.params.code}/confirm">
<input placeholder="new password" name="newPass" value="" required>
<input placeholder="repeat password" name="confirmPass" value="" required>
<button type="submit">SEND</button></form></div>`);
}

exports.resetConfirm = asyncHand(async(req, res) => {
    const {newPass, confirmPass} = req.body;
    const user = await User.findOne({where: {resetToken: req.params.code}});

    if (newPass === confirmPass) {
        await User.update({
            password: await bcrypt.hash(newPass, saltRounds),
        }, {where: {id: user.id}});
        res.status(200).send({
            success: true,
            message: 'new password confirmed'
        });
    } else {
        res.status(200).send({
            success: false,
            message:'passwords not equal'
        });
    }
});

exports.logout = asyncHand(async (req, res) => {
    //i have no idea
})
