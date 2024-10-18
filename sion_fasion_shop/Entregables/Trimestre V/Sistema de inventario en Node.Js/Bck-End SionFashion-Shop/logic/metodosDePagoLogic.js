const MetodosDePago = require('../models/metodosDePago'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo método de pago
const crearMetodoDePago = async (data) => {
    const nuevoMetodoDePago = new MetodosDePago(data);
    return await nuevoMetodoDePago.save();
};

// Obtener todos los métodos de pago
const obtenerMetodosDePago = async () => {
    return await MetodosDePago.find()
        .populate('id_factura'); // Popula la factura asociada
};

// Obtener un método de pago por ID
const obtenerMetodoDePagoPorId = async (id) => {
    return await MetodosDePago.findById(id)
        .populate('id_factura');
};

// Actualizar un método de pago por ID
const actualizarMetodoDePago = async (id, data) => {
    return await MetodosDePago.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Eliminar un método de pago por ID
const eliminarMetodoDePago = async (id) => {
    return await MetodosDePago.findByIdAndDelete(id);
};

module.exports = {
    crearMetodoDePago,
    obtenerMetodosDePago,
    obtenerMetodoDePagoPorId,
    actualizarMetodoDePago,
    eliminarMetodoDePago,
};
