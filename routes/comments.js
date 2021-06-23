'use strict';

const router = require('express').Router();
const comment = require('../controllers/comments');
const {isToken} = require('../midleware/isToken');

router.get('/:id', comment.getCommentById);

router.get('/:id/like', comment.getLikes);

router.post('/:id/like', isToken, comment.createLike);

router.patch('/:id', isToken, comment.updateComment);

router.delete('/:id', isToken, comment.deleteComment);

router.delete('/:id/like', isToken, comment.deleteLike);

module.exports = router;
