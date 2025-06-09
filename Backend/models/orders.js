const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  address: String,
  city: String,
  zipCode: String,
  country: String,
  cardName: String,
  cardNumber: String,
  cartItems: [
    {
      productId: String,
      quantity: Number,
      price: Number,
      // other product details...
    },
  ],
  subtotal: Number,
  tax: Number,
  shipping: Number,
  total: Number,
  status: String,
  createdAt: Date,
});

module.exports = mongoose.model('Order', orderSchema);
