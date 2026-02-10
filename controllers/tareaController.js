const Tarea = require('../models/Tarea');

async function obtenerTareas(req, res, next) {
  try {
    const tareas = await Tarea.find().lean();
    return res.json({ tareas, total: tareas.length });
  } catch (error) {
    return next(error);
  }
}

async function crearTarea(req, res, next) {
  try {
    const { titulo, descripcion, asignadoA, fecha } = req.body;

    if (!titulo || !descripcion) {
      return res.status(400).json({ error: 'Título y descripción son requeridos' });
    }

    const nuevaTarea = await Tarea.create({
      titulo,
      descripcion,
      asignadoA: asignadoA || 'Sin asignar',
      fecha: fecha || new Date().toISOString().split('T')[0],
      creadoPor: req.usuario?.username,
    });

    return res.status(201).json({
      mensaje: 'Tarea creada exitosamente',
      tarea: nuevaTarea,
    });
  } catch (error) {
    return next(error);
  }
}

async function actualizarTarea(req, res, next) {
  try {
    const { id } = req.params;
    const { titulo, descripcion, asignadoA, fecha, completada } = req.body;

    const tarea = await Tarea.findById(id);
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    if (titulo) tarea.titulo = titulo;
    if (descripcion) tarea.descripcion = descripcion;
    if (asignadoA) tarea.asignadoA = asignadoA;
    if (fecha) tarea.fecha = fecha;
    if (completada !== undefined) tarea.completada = completada;

    await tarea.save();

    return res.json({
      mensaje: 'Tarea actualizada exitosamente',
      tarea,
    });
  } catch (error) {
    return next(error);
  }
}

async function eliminarTarea(req, res, next) {
  try {
    const { id } = req.params;

    const tarea = await Tarea.findById(id);
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    await tarea.deleteOne();

    return res.json({
      mensaje: 'Tarea eliminada exitosamente',
      tarea,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
};
