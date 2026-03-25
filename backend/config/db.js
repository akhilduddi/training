const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // process.exit(1); // Usually we would exit, but we don't want to crash the whole node process during dev just because DB isn't up
  }
};

module.exports = connectDB;
