const Product = require('../models/productsModel');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error });
  }
};

// Get all products 
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); 
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error });
  }
};

// Get a single product 
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); 
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product', error });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error });
  }
};

// product count
exports.getProductCount = async (req, res) => {
  try {
    const count = await Product.countDocuments({});
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching product count:", error);
    res.status(500).json({ message: 'Error fetching product count', error: error.message });
  }
};

// getLowStockProducts
exports.getLowStockProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 5;
    const lowStockThreshold = 5; 
    const products = await Product.find({
      stock: { $lt: lowStockThreshold } 
    })
      .sort({ stock: 1 }) 
      .limit(limit);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching low stock products:", error); 
    res.status(500).json({ message: 'Error fetching low stock products', error: error.message });
  }
};

// getTopSellingProducts
exports.getTopSellingProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 3;
    const products = await Product.find({})
      .sort({ price: -1 }) 
      .limit(limit);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching top selling products:", error); 
    res.status(500).json({ message: 'Error fetching top selling products', error: error.message });
  }
};