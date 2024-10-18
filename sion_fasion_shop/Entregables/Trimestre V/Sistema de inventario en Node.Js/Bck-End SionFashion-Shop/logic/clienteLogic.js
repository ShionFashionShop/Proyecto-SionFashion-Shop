const Cliente = require('../models/cliente'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo cliente
const crearCliente = async (data) => {
    const nuevoCliente = new Cliente(data);
    return await nuevoCliente.save();
};

// Obtener todos los clientes
const obtenerClientes = async () => {
    return await Cliente.find()
        .populate('facturas') // Poblamos las facturas asociadas
        .populate('ordenes_de_compras'); // Poblamos las órdenes de compra asociadas
};

// Obtener un cliente por ID
const obtenerClientePorId = async (id) => {
    return await Cliente.findById(id)
        .populate('facturas')
        .populate('ordenes_de_compras');
};

// Actualizar un cliente por ID
const actualizarCliente = async (id, data) => {
    return await Cliente.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Eliminar un cliente por ID
const eliminarCliente = async (id) => {
    return await Cliente.findByIdAndDelete(id);
};

module.exports = {
    crearCliente,
    obtenerClientes,
    obtenerClientePorId,
    actualizarCliente,
    eliminarCliente,
};
