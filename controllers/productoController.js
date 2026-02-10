const Producto = require('../models/Producto');

async function obtenerProductos(req, res, next) {
  try {
    const productos = await Producto.find().lean();
    return res.json({ productos, total: productos.length });
  } catch (error) {
    return next(error);
  }
}

async function crearProducto(req, res, next) {
  try {
    const { titulo, descripcion, asignadoA, fecha } = req.body;

    if (!titulo || !descripcion) {
      return res.status(400).json({ error: 'Título y descripción son requeridos' });
    }

    const nuevoProducto = await Producto.create({
      titulo,
      descripcion,
      asignadoA: asignadoA || 'Sin asignar',
      fecha: fecha || new Date().toISOString().split('T')[0],
      creadoPor: req.usuario?.username,
    });

    return res.status(201).json({
      mensaje: 'Producto creado exitosamente',
      producto: nuevoProducto,
    });
  } catch (error) {
    return next(error);
  }
}

async function actualizarProducto(req, res, next) {
  try {
    const { id } = req.params;
    const { titulo, descripcion, asignadoA, fecha, completada } = req.body;

    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    if (titulo) producto.titulo = titulo;
    if (descripcion) producto.descripcion = descripcion;
    if (asignadoA) producto.asignadoA = asignadoA;
    if (fecha) producto.fecha = fecha;
    if (completada !== undefined) producto.completada = completada;

    await producto.save();

    return res.json({
      mensaje: 'Producto actualizado exitosamente',
      producto,
    });
  } catch (error) {
    return next(error);
  }
}

async function eliminarProducto(req, res, next) {
  try {
    const { id } = req.params;

    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await producto.deleteOne();

    return res.json({
      mensaje: 'Producto eliminado exitosamente',
      producto,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
