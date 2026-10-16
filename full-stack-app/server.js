const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/posts', require('./routes/postRoutes'));

// Connect DB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully!');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Local link: http://localhost:${PORT}/api/posts`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
  });