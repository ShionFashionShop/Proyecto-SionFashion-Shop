const HistorialInventario = require('../models/historialInventario'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo historial de inventario
const crearHistorialInventario = async (data) => {
    const nuevoHistorial = new HistorialInventario(data);
    return await nuevoHistorial.save();
};

// Obtener todos los registros de historial de inventario
const obtenerHistorialInventario = async () => {
    return await HistorialInventario.find()
        .populate('id_producto'); // Popula el producto asociado
};

// Obtener un historial de inventario por ID
const obtenerHistorialInventarioPorId = async (id) => {
    return await HistorialInventario.findById(id)
        .populate('id_producto');
};

// Actualizar un historial de inventario por ID
const actualizarHistorialInventario = async (id, data) => {
    return await HistorialInventario.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Eliminar un historial de inventario por ID
const eliminarHistorialInventario = async (id) => {
    return await HistorialInventario.findByIdAndDelete(id);
};

module.exports = {
    crearHistorialInventario,
    obtenerHistorialInventario,
    obtenerHistorialInventarioPorId,
    actualizarHistorialInventario,
    eliminarHistorialInventario,
};
