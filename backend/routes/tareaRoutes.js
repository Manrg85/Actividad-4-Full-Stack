const express = require('express');
const { verificarToken } = require('../middlewares/auth');
const { permitirRoles } = require('../middlewares/authorize');
const {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
} = require('../controllers/tareaController');
const {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} = require('../controllers/productoController');

const router = express.Router();

router.get('/tareas', verificarToken, permitirRoles('admin', 'user'), obtenerTareas);
router.post('/tareas', verificarToken, permitirRoles('admin', 'user'), crearTarea);
router.put('/tareas/:id', verificarToken, permitirRoles('admin', 'user'), actualizarTarea);
router.delete('/tareas/:id', verificarToken, permitirRoles('admin', 'user'), eliminarTarea);

// Alias de rutas para "productos" (según la actividad)
router.get('/productos', verificarToken, permitirRoles('admin', 'user'), obtenerProductos);
router.post('/productos', verificarToken, permitirRoles('admin', 'user'), crearProducto);
router.put('/productos/:id', verificarToken, permitirRoles('admin', 'user'), actualizarProducto);
router.delete('/productos/:id', verificarToken, permitirRoles('admin', 'user'), eliminarProducto);

module.exports = router;
