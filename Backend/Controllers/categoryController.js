const Category = require('../models/categoryModel');

exports.createCategory = async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;
    console.log('Received data:', req.body);
    console.log('Image URL:', imageUrl);
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    const newCategory = new Category({
      name,
      description,
      imageUrl,
    });

    const savedCat = await newCategory.save();
    res.status(201).json(savedCat);
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(500).json({ error: 'Server error while creating category' });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories", error });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch category", error });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update category", error });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category", error });
  }
};
