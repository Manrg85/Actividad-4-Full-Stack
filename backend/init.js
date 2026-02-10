const bcryptjs = require('bcryptjs');
const { connectDB } = require('./config/db');
const User = require('./models/User');

async function crearAdminPorDefecto() {
  const adminExiste = await User.findOne({ username: 'admin' }).lean();
  if (adminExiste) return;

  const salt = await bcryptjs.genSalt(10);
  const passwordHash = await bcryptjs.hash('admin123', salt);

  await User.create({
    username: 'admin',
    password: passwordHash,
    role: 'admin',
  });

  console.log('Usuario admin creado automáticamente');
}

async function iniciarDB() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/api_tareas';
  await connectDB(mongoUri);
  await crearAdminPorDefecto();
}

module.exports = { iniciarDB };
