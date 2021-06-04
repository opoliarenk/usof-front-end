'use strict'

const Category = require('../models/Category');
const PostCategory = require('../models/PostCategory');
const Post = require('../models/Post');
const asyncHand = require('../midleware/asyncHand');

exports.getCategories = asyncHand(async (req, res) => {
    await Category.findAndCountAll()
        .then(results => {
            res.status(200).json({
                success: true,
                data: results,
            });
        });
});

exports.getCategoryById = asyncHand(async (req, res) => {
    const category = await Category.findOne({where: {id: req.params.id}});

    if (category) {
        res.status(200).json({
            success: true,
            data: category,
        });
    } else {
        res.status(400).send('category not found');
    }
});

exports.newCategory = asyncHand(async (req, res) => {
    const category = await Category.findOne({where: {title: req.body.title}});
    let data = {};

    if (!category) {
        data['title'] = req.body.title;
        if (req.body.description) {
            data['description'] = req.body.description;
        }
        await Category.create(data);
        res.status(200).json({
            success: true,
            message: 'category created',
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'category already exits',
        });
    }
});

exports.updatecategory = asyncHand(async (req, res) => {
    const category = await Category.findOne({where: {id: req.params.id}});
    let data = {};

    if (category) {
        if (req.body.description)
            data['description'] = req.body.description;
        await Category.update(data, {where: {id: req.params.id}});
        res.status(200).send({
            message: 'category updated successfully',
        })
    } else {
        res.status(400).send({
            message: 'category not found',
        })
    }
});

exports.deleteCategory = asyncHand(async (req, res) => {
    //delete category
    if (req.user.role === 'admin' || req.user.id == req.params.id) {
        const category = await Category.destroy({where: {id: req.params.id}});

        if (category !== null) {
            res.status(200).json({
                success: true,
                message: 'delete successfully',
            });
        } else {
            res.status(400).send({
                message: 'category not found',
            });
        }
    } else {
        res.status(403).send({
            message: 'permission denied',
        });
    }
});

exports.getPostsCat = asyncHand(async (req, res) => {
    const posts = await PostCategory.findAll({where: {categoryId: req.params.id}});
    let data = [];

    for (const post of posts) {
        console.log(post.postId);
        let category = await Post.findOne({where: {id: post.postId}});
        data.push(category);
    }

    res.status(200).json({
        success: true,
        data: data,
    });
})

