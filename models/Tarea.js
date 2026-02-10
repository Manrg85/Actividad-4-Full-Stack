const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    asignadoA: { type: String, default: 'Sin asignar' },
    fecha: { type: String },
    creadoPor: { type: String },
    completada: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: 'creadaEn', updatedAt: 'actualizadaEn' } }
);

module.exports = mongoose.model('Tarea', tareaSchema);
