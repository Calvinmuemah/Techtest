const express = require('express');
const router = express.Router();
const { createOrder } = require('../Controllers/orders');

router.post('/orders', createOrder); 

module.exports = router;
