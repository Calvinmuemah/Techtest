const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./Config/db');
const authRoutes = require('./routes/authAdminRoutes');
const protect = require('./middlewares/authAdminMiddleware');
const nodemailer = require("nodemailer");


dotenv.config();
const app = express();
connectDB();

// Middleware
app.use(express.json()); 
app.use(cors()); 

app.use(cors({
  origin: "*",
  // methods: ['GET', 'POST',"PUT", "DELETE"],
}));

// Setup Nodemailer Transporter
const sendResetEmail = async (email, subject, text) => {
  let transporter = nodemailer.createTransport({
    service: 'Gmail', // or another service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    text,
  });
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
