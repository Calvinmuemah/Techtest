const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { deleteCategory, updateCategory, createCategory, getCategories } = require('../Controllers/category.controller'); // ✅ FIXED PATH

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Routes
router.get('/categories', getCategories);
router.post('/createCat', upload.single('image'), createCategory);
router.put('/updateCat/:id', upload.single('image'), updateCategory); // ✅ fixed :id
router.delete('/deleteCat/:id', deleteCategory); // ✅ added leading slash

module.exports = router;
