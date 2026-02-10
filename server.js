require('dotenv').config();

const bcryptjs = require('bcryptjs');
const app = require('./app');
const { connectDB } = require('./config/db');
const User = require('./models/User');

const PORT = process.env.PORT || 3000;

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

async function iniciarServidor() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/api_tareas';
  await connectDB(mongoUri);
  await crearAdminPorDefecto();

  if (require.main === module) {
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
      console.log('Rutas disponibles:');
      console.log('   POST   /register - Registrar usuario');
      console.log('   POST   /login    - Iniciar sesión');
      console.log('   GET    /tareas   - Obtener todas las tareas');
      console.log('   POST   /tareas   - Crear nueva tarea');
      console.log('   PUT    /tareas/:id - Actualizar tarea');
      console.log('   DELETE /tareas/:id - Eliminar tarea');
      console.log('Credenciales por defecto:');
      console.log('   Usuario: admin');
      console.log('   Contraseña: admin123');
    });
  }
}

iniciarServidor().catch((error) => {
  console.error('Error al iniciar el servidor:', error);
});

module.exports = app;
