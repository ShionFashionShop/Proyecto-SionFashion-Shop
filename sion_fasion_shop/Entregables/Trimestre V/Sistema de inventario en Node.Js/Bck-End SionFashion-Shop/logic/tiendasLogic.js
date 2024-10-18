const Tienda = require('../models/tienda'); // Asegúrate de que la ruta sea correcta

// Crear una nueva tienda
const crearTienda = async (data) => {
    const nuevaTienda = new Tienda(data);
    return await nuevaTienda.save();
};

// Obtener todas las tiendas
const obtenerTiendas = async () => {
    return await Tienda.find().populate('id_ciudad id_empresa empleados productos'); // Poblamos las referencias
};

// Obtener una tienda por ID
const obtenerTiendaPorId = async (id) => {
    return await Tienda.findById(id).populate('id_ciudad id_empresa empleados productos');
};

// Actualizar una tienda por ID
const actualizarTienda = async (id, data) => {
    return await Tienda.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Eliminar una tienda por ID
const eliminarTienda = async (id) => {
    return await Tienda.findByIdAndDelete(id);
};

module.exports = {
    crearTienda,
    obtenerTiendas,
    obtenerTiendaPorId,
    actualizarTienda,
    eliminarTienda,
};
    