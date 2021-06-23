'use strict'

const router = require('express').Router();
const post = require('../controllers/post');
const {isToken} = require('../midleware/isToken');
const {getUser} = require('../midleware/getUser');

router.get('/', getUser, post.getAllPosts);

router.get('/:id', post.getPostById);

router.get('/:id/comments', post.getCommentsPost);

router.post('/:id/comments', isToken, post.createComment);

router.get('/:id/categories', post.getCategoriesPost);

router.get('/:id/like', post.getLikes);

router.post('/', isToken, post.createPost);

router.post('/:id/like', isToken, post.createLike);

router.patch('/:id', isToken, post.updatePost);

router.delete('/:id', isToken, post.deletePost);

router.delete('/:id/like', isToken, post.deleteLike);

module.exports = router;
