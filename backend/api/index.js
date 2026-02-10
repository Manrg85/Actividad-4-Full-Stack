const app = require('../app');
const { connectDB } = require('../config/db');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/api_tareas';
connectDB(mongoUri).catch((error) => {
  console.error('Error al conectar a MongoDB en Vercel:', error);
});

module.exports = app;
