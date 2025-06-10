const express = require('express');
const { getAllUsers, getUsersCount } = require('../Controllers/user.controller.js');

const router = express.Router();

router.get('/customers', getAllUsers);
router.get('/customers/count', getUsersCount);

module.exports = router;
