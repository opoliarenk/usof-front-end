'use strict'

const router = require('express').Router();
const categories = require('../controllers/categories');
const {isToken} = require('../midleware/isToken');
const {isAdmin} = require('../midleware/isAdmin');

router.get('/', categories.getCategories);

router.get('/:id', categories.getCategoryById);

router.get('/:id/posts', categories.getPostsCat);

router.post('/', isToken, isAdmin, categories.newCategory);

router.patch('/:id', isToken, isAdmin, categories.updatecategory);

router.delete('/:id', isToken, isAdmin, categories.deleteCategory);

module.exports = router;
