const express = require('express');
const { getAllUsers, getUsersCount } = require('../Controllers/user.controller.js');

const router = express.Router();

router.get('/Users', getAllUsers);
router.get('/users/count', getUsersCount);

module.exports = router;
