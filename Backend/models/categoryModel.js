const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  image: {
    url: { type: String, required: true },         // actual file URL or path
    public_id: { type: String }                    // useful if using Cloudinary or similar
  },
  itemCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
