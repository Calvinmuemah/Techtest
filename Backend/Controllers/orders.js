const Order = require('../models/orders');

const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      address,
      city,
      zipCode,
      country,
      cardName,
      cardNumber,
      cartItems,
      subtotal,
      tax,
      shipping,
      total,
    } = req.body;

    const newOrder = new Order({
      customerName,
      email,
      phone,
      address,
      city,
      zipCode,
      country,
      cardName,
      cardNumber,
      cartItems,
      subtotal,
      tax,
      shipping,
      total,
      status: 'Pending',
      createdAt: new Date(),
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to place order', details: error.message });
  }
};

module.exports = { createOrder };
