const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Successfully connected to MongoDB Atlas!');
  } catch (err) {
    console.error('Connection error', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB; 