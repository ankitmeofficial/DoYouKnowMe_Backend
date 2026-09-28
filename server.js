const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');

// Load Environment Variables
dotenv.config();

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database
connectDB();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for dev/production access
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'Backend server is healthy and running.',
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('<h1>Ankit Kumar Singh Portfolio Backend API</h1><p>Status: Online</p>');
});

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API Route Not Found',
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start Server
app.listen(PORT, () => {
  console.log('====================================================');
  console.log(`🚀 Portfolio Backend Server running on port ${PORT}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
  console.log('====================================================');
});
