const mongoose = require('mongoose');

const WaitlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
  },
  location: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'vendor'],
    required: true,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Waitlist', WaitlistSchema); 