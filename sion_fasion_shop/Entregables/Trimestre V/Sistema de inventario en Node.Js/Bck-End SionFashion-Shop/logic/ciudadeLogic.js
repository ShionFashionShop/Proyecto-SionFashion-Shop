const Ciudade = require('../models/ciudade'); // Asegúrate de que la ruta sea correcta

// Crear una nueva ciudad
const crearCiudad = async (data) => {
    const nuevaCiudad = new Ciudade(data);
    return await nuevaCiudad.save();
};

// Obtener todas las ciudades
const obtenerCiudades = async () => {
    return await Ciudade.find()
        .populate('empleados') // Popula empleados asociados
        .populate('id_departamentoNavigation') // Popula departamento asociado
        .populate('proveedores') // Popula proveedores asociados
        .populate('tienda'); // Popula tiendas asociadas
};

// Obtener una ciudad por su ID
const obtenerCiudadPorId = async (id) => {
    return await Ciudade.findById(id)
        .populate('empleados')
        .populate('id_departamentoNavigation')
        .populate('proveedores')
        .populate('tienda');
};

// Actualizar una ciudad
const actualizarCiudad = async (id, data) => {
    return await Ciudade.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Eliminar una ciudad
const eliminarCiudad = async (id) => {
    return await Ciudade.findByIdAndDelete(id);
};

module.exports = {
    crearCiudad,
    obtenerCiudades,
    obtenerCiudadPorId,
    actualizarCiudad,
    eliminarCiudad,
};
