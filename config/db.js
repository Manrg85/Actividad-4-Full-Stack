const mongoose = require('mongoose');

async function connectDB(mongoUri) {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!mongoUri) {
    throw new Error('MONGODB_URI no definido');
  }

  await mongoose.connect(mongoUri);
  return mongoose.connection;
}

module.exports = { connectDB };
