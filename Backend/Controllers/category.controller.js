const Category = require('../models/categoryModel');
const path = require('path');
const fs = require('fs');

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    let image = { url: '' };

    if (req.file) {
      image.url = `/uploads/${req.file.filename}`; // frontend expects the full URL path
    }

    const category = new Category({ name, description, image });

    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) return res.status(404).json({ message: 'Category not found' });

    category.name = name || category.name;
    category.description = description || category.description;

    if (req.file) {
      // Delete old image file if exists
      if (category.image?.url) {
        const oldImagePath = path.join(__dirname, '..', category.image.url);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      category.image = { url: `/uploads/${req.file.filename}` };
    }

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    // Delete image file if exists
    if (category.image?.url) {
      const imagePath = path.join(__dirname, '..', category.image.url);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await category.deleteOne();
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { deleteCategory, updateCategory, createCategory, getCategories };