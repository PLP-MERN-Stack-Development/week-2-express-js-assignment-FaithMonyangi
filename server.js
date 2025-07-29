// server.js
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const productRoutes = require('./routes/products');

const app = express();
const PORT = 5000;

// Built-in Middleware (replaces body-parser)
app.use(express.json()); // replaces bodyParser.json()
app.use(express.urlencoded({ extended: true })); // if you're parsing URL-encoded data

// Custom Middleware
app.use(logger);
app.use(auth);

// Routes
app.use('/api/products', productRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Root Route
app.get('/', (req, res) => {
  res.send('Hello, Express.js!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
