const OrdenesProducto = require('../models/ordenesProducto'); // Asegúrate de que la ruta sea correcta

// Crear una nueva orden de producto
const crearOrdenDeProducto = async (data) => {
    const nuevaOrdenDeProducto = new OrdenesProducto(data);
    return await nuevaOrdenDeProducto.save();
};

// Obtener todas las órdenes de producto
const obtenerOrdenesProducto = async () => {
    return await OrdenesProducto.find()
        .populate('id_orden_compra') // Poblamos la referencia a OrdenesDeCompra
        .populate('id_producto'); // Poblamos la referencia a Producto
};

// Obtener una orden de producto por ID
const obtenerOrdenDeProductoPorId = async (id) => {
    return await OrdenesProducto.findById(id)
        .populate('id_orden_compra')
        .populate('id_producto');
};

// Actualizar una orden de producto por ID
const actualizarOrdenDeProducto = async (id, data) => {
    return await OrdenesProducto.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Eliminar una orden de producto por ID
const eliminarOrdenDeProducto = async (id) => {
    return await OrdenesProducto.findByIdAndDelete(id);
};

module.exports = {
    crearOrdenDeProducto,
    obtenerOrdenesProducto,
    obtenerOrdenDeProductoPorId,
    actualizarOrdenDeProducto,
    eliminarOrdenDeProducto,
};
