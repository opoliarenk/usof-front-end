'use strict';

const router = require("express").Router();
const user = require("../controllers/auth");
const {isToken} = require('../midleware/isToken');

router.post("/register", user.register);

router.post("/login", user.login);

//to do -> logout
router.post("/logout", isToken, user.logout);

router.post("/password-reset", isToken, user.resetPass);

router.get("/password-reset/:code", user.resetForm);

router.post("/password-reset/:code/confirm", user.resetConfirm);

router.get('/confirm/:code', user.confirmEmail);

module.exports = router;
