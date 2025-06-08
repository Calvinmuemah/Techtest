const express = require('express');
const router = express.Router();
const categoryController = require('../Controllers/categoryController');

// Create
router.post('/createCat', categoryController.createCategory);

// Read
router.get('/getCats', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// Update
router.put('/:id', categoryController.updateCategory);

// Delete
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
