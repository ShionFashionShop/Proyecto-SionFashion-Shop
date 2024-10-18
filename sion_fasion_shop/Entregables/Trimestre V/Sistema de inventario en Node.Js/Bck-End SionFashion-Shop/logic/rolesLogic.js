const Role = require('../models/role'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo rol
const crearRole = async (data) => {
    const nuevoRole = new Role(data);
    return await nuevoRole.save();
};

// Obtener todos los roles
const obtenerRoles = async () => {
    return await Role.find().populate('usuarios'); // Poblamos la referencia
};

// Obtener un rol por ID
const obtenerRolePorId = async (id) => {
    return await Role.findById(id).populate('usuarios');
};

// Actualizar un rol por ID
const actualizarRole = async (id, data) => {
    return await Role.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Eliminar un rol por ID
const eliminarRole = async (id) => {
    return await Role.findByIdAndDelete(id);
};

module.exports = {
    crearRole,
    obtenerRoles,
    obtenerRolePorId,
    actualizarRole,
    eliminarRole,
};
