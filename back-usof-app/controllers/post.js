'use strict'

const PostCategory = require('../models/PostCategory');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const LikePost = require('../models/LikePost');
const Category = require('../models/Category');
const asyncHand = require('../midleware/asyncHand');

exports.getAllPosts = asyncHand(async (req, res) => {
    if (req.user && req.user.role === 'admin') {
        await Post.findAndCountAll()
            .then(results => {
                res.status(200).json({
                    success: true,
                    data: results,
                })
            })
    } else {
        await Post.findAndCountAll({where: {status: "active"}})
            .then(results => {
                res.status(200).json({
                    success: true,
                    data: results,
                })
            })
    }
});

exports.getPostById = asyncHand(async (req, res) => {
    const post = await Post.findOne({where: {id: req.params.id}});

    if (post) {
        res.status(200).json({
            success: true,
            data: post,
        });
    } else {
        res.status(400).send('post not found');
    }
});

exports.getCommentsPost = asyncHand(async (req, res) => {
    if (await Post.findOne({where: {id: req.params.id}})) {
        const comments = await Comment.findAll({where: {postId: req.params.id}});

        res.status(200).json({
            success: true,
            data: comments,
        });
    } else {
        res.status(400).send('post not found');
    }
});

exports.createComment = asyncHand(async (req, res, next) => {
    const content = req.body.content;
    const post = await Post.findOne({where: {
        id: req.params.id,
        status: 'active',
    }});

    if (post) {
        await Comment.create({
            author: req.user.id,
            publishDate: Date.now(),
            content: content,
            postId: req.params.id,
        })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the User."
                });
            });

        res.status(200).json({
            success: true,
            message: 'comment created successfully',
            data: content,
        });
    } else {
        res.status(400).send("post not found");
    }
});

exports.getCategoriesPost = async(req, res) => {
    if (await Post.findOne({where: {id: req.params.id}})) {
        const postCategory = await PostCategory.findAll({where: {postId: req.params.id}});

        res.status(200).json({
            success: true,
            data: postCategory,
        });
    } else {
        res.status(400).send({
            message: 'post not found',
        });
    }
}

exports.getLikes = async(req, res) => {
    const post = await Post.findOne({where: {
        id: req.params.id,
        status: 'active',
    }});

    if (post) {
        const likes = await LikePost.findAll({where: {postId: req.params.id}})
        res.status(200).json({
            success: true,
            data: likes,
        });
    } else {
        res.status(400).send({
            message: 'cannot get likes from post',
        });
    }
}

exports.createPost = asyncHand(async (req, res) => {
    const {content, title} = req.body;
    const categories = req.body.categories.split(",");
    let iter;

    let newPost = await Post.create({
        author: req.user.id,
        title: title,
        publishDate: Date.now(),
        status: 'active',
        content: content,
    });

    for (let category of categories) {
        iter = await Category.findOne({where: {title: category}});
        if (iter) {
            await PostCategory.create({
                postId: newPost.id,
                categoryId: iter.id,
            })
        }
    }
    res.status(200).json({
        success: true,
        message: 'create post successfully',
    })
});

exports.createLike = asyncHand(async (req, res) => {
    const postId = req.params.id;
    const like = await LikePost.findOne({where: {
            author: req.user.id,
            postId: postId,
        }});

    if (!like && await Post.findOne({where: {id: postId}})) {
        await LikePost.create({
            author: req.user.id,
            postId: postId,
        });

        res.status(200).json({
            success: true,
            message: 'like create successfully',
        });
    } else {
        res.status(400).send('cannot like post');
    }
});

exports.updatePost = asyncHand(async (req, res) => {
    const post = await Post.findOne({where: {id: req.params.id}});
    const {content, status} = req.body;

    if (post && (req.user.id === post.author || req.user.role === 'admin')) {
        let data = {};

        if (content)
            data['content'] = content;
        if (status)
            data['status'] = status;
        await Post.update(data, {where: {id: req.params.id}});

        res.status(200).send('post edit successfully ' + status);
    } else {
        res.status(400).send('permission denied');
    }
});

exports.deletePost = asyncHand(async (req, res) => {
    const post = await Post.findOne({where: {id: req.params.id}});

    if (post && (req.user.role === 'admin' || req.user.id == post.author)) {
        if (post !== null) {
            res.status(200).json({
                success: true,
                message: 'delete successfully',
            });
        } else {
            res.status(400).send({
                message: 'post not found',
            });
        }
    } else {
        res.status(403).send({
            message: 'permission denied',
        });
    }
});

exports.deleteLike = asyncHand(async(req, res) => {
    const postId = req.params.id;
    const like = await LikePost.findOne({where: {
            author: req.user.id,
            postId: postId,
        }});

    if (like && await Post.findOne({where: {id: postId}})) {
        await LikePost.destroy({where: {
                author: req.user.id,
                postId: postId,
            }});
        res.status(200).json({
            success: true,
            message: 'like removed successfully',
        });
    } else {
        res.status(400).send('cannot delete like post');
    }
});
