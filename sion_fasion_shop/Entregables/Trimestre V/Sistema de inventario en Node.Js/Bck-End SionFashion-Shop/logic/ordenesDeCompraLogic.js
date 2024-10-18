const OrdenesDeCompra = require('../models/ordenesDeCompra'); // Asegúrate de que la ruta sea correcta

// Crear una nueva orden de compra
const crearOrdenDeCompra = async (data) => {
    const nuevaOrdenDeCompra = new OrdenesDeCompra(data);
    return await nuevaOrdenDeCompra.save();
};

// Obtener todas las órdenes de compra
const obtenerOrdenesDeCompra = async () => {
    return await OrdenesDeCompra.find()
        .populate('id_cliente')
        .populate('id_factura')
        .populate('id_empleado')
        .populate('ordenes_productos'); // Popula los productos de la orden
};

// Obtener una orden de compra por ID
const obtenerOrdenDeCompraPorId = async (id) => {
    return await OrdenesDeCompra.findById(id)
        .populate('id_cliente')
        .populate('id_factura')
        .populate('id_empleado')
        .populate('ordenes_productos');
};

// Actualizar una orden de compra por ID
const actualizarOrdenDeCompra = async (id, data) => {
    return await OrdenesDeCompra.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Eliminar una orden de compra por ID
const eliminarOrdenDeCompra = async (id) => {
    return await OrdenesDeCompra.findByIdAndDelete(id);
};

module.exports = {
    crearOrdenDeCompra,
    obtenerOrdenesDeCompra,
    obtenerOrdenDeCompraPorId,
    actualizarOrdenDeCompra,
    eliminarOrdenDeCompra,
};
