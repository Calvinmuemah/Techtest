const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getOrderCount, getTotalRevenue, getRecentOrders, getSalesOverview} = require('../Controllers/orders');

router.post('/orders', createOrder); 
router.get('/getAllOrders', getAllOrders);
router.get('/ordersCount', getOrderCount);
router.get('/orders/revenue', getTotalRevenue);
router.get('/orders/recent', getRecentOrders);
router.get('/sales/overview', getSalesOverview);

module.exports = router;
