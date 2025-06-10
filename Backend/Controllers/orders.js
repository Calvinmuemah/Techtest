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
// get all orders from the database
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    console.log('✅ Orders fetched:', orders.length);

    res.status(200).json(orders);
  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    res.status(500).json({
      message: 'Server error. Could not fetch orders.',
      error: error.message,
      stack: error.stack,
    });
  }
};

// getOrderCount
const getOrderCount = async (req, res) => {
  try {
    const count = await Order.countDocuments({});
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching order count:", error); 
    res.status(500).json({ message: 'Error fetching order count', error: error.message });
  }
};

// getTotalRevenue
const getTotalRevenue = async (req, res) => {
  try {
    const result = await Order.aggregate([
  {
    $group: {
      _id: null,
      totalRevenue: { $sum: "$total" }
    }
  }
]);
    const total = result.length > 0 ? result[0].totalRevenue : 0;

    res.status(200).json({ total: total });
  } catch (error) {
    console.error("Error fetching total revenue:", error); 
    res.status(500).json({ message: 'Error fetching total revenue', error: error.message });
  }
};

// getRecentOrders
const getRecentOrders = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 3;
    const orders = await Order.find({})
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order (most recent first)
      .limit(limit);

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching recent orders:", error); 
    res.status(500).json({ message: 'Error fetching recent orders', error: error.message });
  }
};

// getSalesOverview (for graph)
const getSalesOverview = async (req, res) => {
  try {
    const salesData = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" }, 
            month: { $month: "$createdAt" } 
          },
          sales: { $sum: "$total" } 
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      },
      {
        $project: {
          _id: 0, 
          month: {
            $dateToString: {
              format: "%Y-%m", 
              date: {
                $dateFromParts: { 
                  year: "$_id.year",
                  month: "$_id.month",
                  day: 1 
                }
              }
            }
          },
          sales: "$sales"
        }
      }
    ]);

    // Format the data for Chart.js
    const labels = salesData.map(item => item.month);
    const data = salesData.map(item => item.sales);

    res.status(200).json({ labels, data });
  } catch (error) {
    console.error("Error fetching sales overview:", error);
    res.status(500).json({ message: 'Error fetching sales overview', error: error.message });
  }
};

module.exports = { createOrder, getAllOrders, getOrderCount, getTotalRevenue, getRecentOrders, getSalesOverview };
