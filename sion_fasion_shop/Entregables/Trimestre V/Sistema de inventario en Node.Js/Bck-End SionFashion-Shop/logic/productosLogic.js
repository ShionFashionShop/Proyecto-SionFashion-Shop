const Producto = require('../models/producto'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo producto
const crearProducto = async (data) => {
    const nuevoProducto = new Producto(data);
    return await nuevoProducto.save();
};

// Obtener todos los productos
const obtenerProductos = async () => {
    return await Producto.find()
        .populate('id_sub_categoria')
        .populate('id_proveedor')
        .populate('id_tienda')
        .populate('id_factura'); // Poblamos las referencias
};

// Obtener un producto por ID
const obtenerProductoPorId = async (id) => {
    return await Producto.findById(id)
        .populate('id_sub_categoria')
        .populate('id_proveedor')
        .populate('id_tienda')
        .populate('id_factura');
};

// Actualizar un producto por ID
const actualizarProducto = async (id, data) => {
    return await Producto.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Eliminar un producto por ID
const eliminarProducto = async (id) => {
    return await Producto.findByIdAndDelete(id);
};

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto,
};
