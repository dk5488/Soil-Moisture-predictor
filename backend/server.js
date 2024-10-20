const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(cors({
    origin: '*' // Replace with your frontend origin
  }));

// MongoDB connection
mongoose.connect('mongodb+srv://dk5488:IvNCy0CKXLHIoZA9@cluster0.rcxng.mongodb.net/moistureRecord', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api', routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
