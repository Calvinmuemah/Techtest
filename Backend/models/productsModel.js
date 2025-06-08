const mongoose = require('mongoose');

const specificationSchema = new mongoose.Schema({}, { _id: false, strict: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  subCategory: String,
  price: { type: Number, required: true },
  oldPrice: Number,
  description: String,
  features: [String],
  specifications: specificationSchema,
  image: String,
  images: [String],
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isNew: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
