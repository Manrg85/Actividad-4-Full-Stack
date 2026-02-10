require('dotenv').config();

const app = require('./app');
const { iniciarDB } = require('./init');

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
  await iniciarDB();

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
