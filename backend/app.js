const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const tareaRoutes = require('./routes/tareaRoutes');

const app = express();

// Middlewares base
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Archivos estáticos
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

// Rutas
app.use(authRoutes);
app.use(tareaRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
  });
});

module.exports = app;

