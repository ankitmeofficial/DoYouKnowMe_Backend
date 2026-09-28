const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.log('----------------------------------------------------');
    console.log('⚠️  MONGODB_URI environment variable not found.');
    console.log('💡 Running Backend with In-Memory Storage Fallback.');
    console.log('----------------------------------------------------');
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log('💡 Falling back to In-Memory storage mode.');
    return false;
  }
};

module.exports = connectDB;
