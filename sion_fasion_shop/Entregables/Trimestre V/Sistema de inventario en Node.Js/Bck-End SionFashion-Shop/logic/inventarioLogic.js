const Inventario = require('../models/inventario'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo registro de inventario
const crearInventario = async (data) => {
    const nuevoInventario = new Inventario(data);
    return await nuevoInventario.save();
};

// Obtener todos los registros de inventario
const obtenerInventarios = async () => {
    return await Inventario.find()
        .populate('id_producto'); // Popula el producto asociado
};

// Obtener un registro de inventario por ID
const obtenerInventarioPorId = async (id) => {
    return await Inventario.findById(id)
        .populate('id_producto');
};

// Actualizar un registro de inventario por ID
const actualizarInventario = async (id, data) => {
    return await Inventario.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Eliminar un registro de inventario por ID
const eliminarInventario = async (id) => {
    return await Inventario.findByIdAndDelete(id);
};

module.exports = {
    crearInventario,
    obtenerInventarios,
    obtenerInventarioPorId,
    actualizarInventario,
    eliminarInventario,
};
