const express = require('express');
const router = express.Router();
const productController = require('../Controllers/productsController');

// Create
router.post('/createProduct', productController.createProduct);

// Read
router.get('/products/all', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Update
router.put('/:id', productController.updateProduct);

// Delete
router.delete('/:id', productController.deleteProduct);

module.exports = router;


