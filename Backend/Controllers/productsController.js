const Product = require('../models/productsModel');
const Category = require('../models/categoryModel');
const Order = require('../models/orders');
const mongoose = require('mongoose');


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


exports.getProducts = async (req, res) => {
  try {
    const { categoryName, search } = req.query;

    let query = {};

    // 1. Filter by Category Name
    if (categoryName) {
      const existingCategory = await Category.findOne({ name: { $regex: new RegExp(`^${categoryName}$`, 'i') } });

      if (!existingCategory) {
        return res.status(200).json([]); 
      }
      query.category = existingCategory.name;
    }

    // 2. Filter by Search Query
    if (search) {
      const searchTerm = search;
      query.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    const products = await Product.find(query); 

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error while fetching products', error: error.message });
  }
};

// --- GET Single Product by ID (This remains unchanged and is correct) ---
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(`Error fetching product with ID ${req.params.id}:`, error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }
    res.status(500).json({ message: 'Server error while fetching product', error: error.message });
  }
};


exports.getProductDetailsById = async (req, res) => {
    console.log(`getProductDetailsById controller hit for ID: ${req.params.id}`);
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log('Invalid ID format:', id);
            return res.status(400).json({ message: 'Invalid product ID format.' });
        }
        const product = await Product.findById(id).populate('category');

        if (!product) {
            console.log('Product not found for ID:', id);
            return res.status(404).json({ message: 'Product not found.' });
        }

        console.log('Product found:', product.name);
        res.status(200).json(product);
    } catch (error) {
        console.error(`Error in getProductDetailsById for ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Server error while fetching product.' });
    }
};

exports.getAllProductsDetails = async (req, res) => {
  try {
    const { categoryId } = req.query; 

    let query = {};
    if (categoryId) {
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({ message: 'Invalid category ID format.' });
      }
      query.category = categoryId;
    }

    const products = await Product.find(query)
                                  .populate('category')
                                  .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ message: 'Server error while fetching products.' });
  }
};

// GET /api/products/featured
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true }).limit(4); // Limit to a reasonable number
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({ message: 'Server error fetching featured products.' });
  }
};

// GET /api/products/new
exports.getNewArrivals = async (req, res) => {
  try {
    const products = await Product.find({ isNew: true })
                                   .sort({ createdAt: -1 }) 
                                   .limit(4); 
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching new arrivals:', error);
    res.status(500).json({ message: 'Server error fetching new arrivals.' });
  }
};

// getBestsellers
exports.getBestsellers = async (req, res) => {
  try {
    const bestsellers = await Product.find({ isBestseller: true })
                                     .sort({ reviews: -1 })
                                     .limit(4); 

    
    res.status(200).json(bestsellers);

  } catch (error) {
    console.error('Error fetching bestsellers:', error);
    res.status(500).json({ message: 'Server error fetching bestsellers.' });
  }
};