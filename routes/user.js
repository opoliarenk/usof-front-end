'use strict';

const router = require('express').Router();
const user = require('../controllers/user');
const {isToken} = require('../midleware/isToken');
const {isAdmin} = require('../midleware/isAdmin');

// router.get('/', isToken, isAdmin, user.getALlUsers);
router.get('/', user.getALlUsers);

router.get('/:id', user.getUserById);

router.post('/', isToken, isAdmin, user.createUser);

router.post('/avatar', isToken, user.uploadAvatar);

router.patch('/:id', isToken, user.updateUser);

router.delete('/:id', isToken, user.deleteUser);

module.exports = router;