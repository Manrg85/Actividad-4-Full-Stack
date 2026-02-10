const app = require('../app');
const { iniciarDB } = require('../init');

iniciarDB().catch((error) => {
  console.error('Error al conectar a MongoDB en Vercel:', error);
});

module.exports = app;
