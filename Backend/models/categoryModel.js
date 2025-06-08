const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
  },
  imageUrl: { type: String },
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);


// const mongoose = require('mongoose');

// const categorySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, default: '' },
//   image: {
//     url: { type: String, required: true },
//     public_id: { type: String }
//   },
//   itemCount: { type: Number, default: 0 },
// }, { timestamps: true });
// const Category = mongoose.model('Category', categorySchema);