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

router.get('/products/count', productController.getProductCount);
router.get('/products/low-stock', productController.getLowStockProducts);
router.get('/products/top-selling', productController.getTopSellingProducts);
//  get routes by category
router.get('/products/getProducts', productController.getProducts);
router.get('/products/getProductById', productController.getProductById);

router.get('/product/getProductDetailsById/:id', productController.getProductDetailsById);
router.get('/product/getAllProductsDetails', productController.getAllProductsDetails);
router.get('/product/getFeaturedProducts', productController.getFeaturedProducts);
router.get('/product/getNewArrivals', productController.getNewArrivals);
// router.get('/product/getBestsellers', productController.getBestsellers);


module.exports = router;


