'use strict'

const User = require('../models/User');
const asyncHand = require('../midleware/asyncHand');
const bcrypt = require('bcrypt');
const isEmail = require('isemail');

exports.getALlUsers = asyncHand(async (req, res, next) => {
    await User.findAndCountAll()
        .then(results => {
            // const itemCount = results.count;
            // const pageCount = Math.ceil(results.count / req.query.limit);
            res.status(200).json({
                success: true,
                data: results,
                // pageCount,
                // itemCount,
                // pages: paginate.getArrayPages(req)(3, pageCount, req.query.limit),
            });
        })
        .catch(err => next(err))
});

//done
exports.getUserById = asyncHand(async (req, res) => {
    const user = await User.findOne({where: {id: req.params.id}});

    if (user) {
        res.status(200).json({
            success: true,
            data: user,
        })
    } else {
        res.status(400).send('user not found');
    }
});

exports.createUser = asyncHand(async(req, res, next) => {
    //only for admins
    const {login, password, passConfirm, email, fullName, role} = req.body;
    const checkLogin = await User.findOne({where: {login: login}});
    const checkEmail = await User.findOne({where: {email: email}});
    const validEmail = isEmail.validate(email, {errorLevel: false});

    if (checkEmail || checkLogin || !validEmail) {
        res.status(400).send({
            message: 'wrong params',
        });

        return;
    }
    if (password !== passConfirm) {
        res.status(400).send({
            message: 'repeat pass',
        });

        return;
    }

    await User.create({
        login: login,
        password: await bcrypt.hash(password, 10),
        fullName: fullName,
        email: email,
        confirmed: false,
        confirmStr: 'adminCreate',
        role: role,
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
    res.status(200).json({success: true});
});

exports.uploadAvatar = asyncHand(async (res, req, next) => {
    if (req.user.role === 'admin' || req.user.id === req.params.id) {
        const avatar = req.file.filename;
        await User.update({avatar: avatar}, {where: {id: req.user.id}});

        res.status(200).json({
            success: true,
            message: 'avatar upload successfully',
        });
    } else {
        res.status(403).json({
            success: false,
            message: 'permission denied',
        });
    }
});

exports.deleteUser = asyncHand(async (req, res, next) => {
    //delete user
    if (req.user.role === 'admin' || req.user.id == req.params.id) {
        const user = await User.destroy({where: {id: req.params.id}});

        if (user !== null) {
            res.status(200).json({
                success: true,
                message: 'delete successfully',
            });
        } else {
            res.status(400).send({
                message: 'user not found',
            });
        }
    } else {
        res.status(403).send({
            message: 'permission denied',
        });
    }
});

exports.updateUser = asyncHand(async (req, res, next) => {
    console.log(req.user);
    if (req.user.role === 'admin' || req.user.id == req.params.id) {
        const {login, fullName, email, password, role} = req.body;
        let data = {};

        //update login
        if (login !== undefined) {
            const checkLogin = await User.findOne({ where: { login } });

            if (checkLogin) {
                res.status(400).send({
                    message: 'login is exists'
                });

                return;
            }
            data['login'] = login;
        }
        //update full name
        if (fullName !== undefined) {
            data['fullName'] = fullName;
        }
        //update email
        if (email !== undefined) {
            const checkEmail = await User.findOne({ where: { email } });

            if (checkEmail) {
                res.status(400).send({
                    message: 'email is exists'
                });

                return;
            }
            data['email'] = email;
        }
        //update password
        if (password !== undefined) {
            const hashPass = await bcrypt.hash(password, 10);

            data['password'] = hashPass;
        }
        if (role !== undefined) {
            data['role'] = role;
        }
        //update user
        const updUser = await User.update(data, {where: {id: req.params.id}});

        if (updUser[0] === 1) {
            res.status(200).send({
                message: 'user update successfully'
            });
        } else {
            res.status(400).send({
                message: 'could not update user'
            });
        }
    } else {
        res.status(403).send({
            message: 'permission denied',
        });
    }
});