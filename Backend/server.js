const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./Config/db');
const nodemailer = require("nodemailer");
const path = require('path');
const fs = require('fs');

// middlewares
const { errorHandler } = require('./middlewares/error.middleware');

// routes
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productsRoutes');
const UserAuthRoutes = require('./routes/user');
const UserRoutes = require('./routes/userAuth');
const orderRoutes = require('./routes/orders');
const uploads = require('./routes/upload');


dotenv.config();
const app = express();
connectDB();

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// app.use(cors({
//   origin: "*",
// }));
// Example root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use('/api', UserAuthRoutes);
app.use('/api', UserRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api/upload', uploads);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Custom error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
