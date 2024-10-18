const Proveedor = require('../models/proveedor'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo proveedor
const crearProveedor = async (data) => {
    const nuevoProveedor = new Proveedor(data);
    return await nuevoProveedor.save();
};

// Obtener todos los proveedores
const obtenerProveedores = async () => {
    return await Proveedor.find()
        .populate('id_ciudad')
        .populate('productos'); // Poblamos las referencias
};

// Obtener un proveedor por ID
const obtenerProveedorPorId = async (id) => {
    return await Proveedor.findById(id)
        .populate('id_ciudad')
        .populate('productos');
};

// Actualizar un proveedor por ID
const actualizarProveedor = async (id, data) => {
    return await Proveedor.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Eliminar un proveedor por ID
const eliminarProveedor = async (id) => {
    return await Proveedor.findByIdAndDelete(id);
};

module.exports = {
    crearProveedor,
    obtenerProveedores,
    obtenerProveedorPorId,
    actualizarProveedor,
    eliminarProveedor,
};
