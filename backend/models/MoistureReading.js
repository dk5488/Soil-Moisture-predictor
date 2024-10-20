const mongoose = require('mongoose');

const MoistureReadingSchema = new mongoose.Schema({
  soil_moisture: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('MoistureReading', MoistureReadingSchema);
