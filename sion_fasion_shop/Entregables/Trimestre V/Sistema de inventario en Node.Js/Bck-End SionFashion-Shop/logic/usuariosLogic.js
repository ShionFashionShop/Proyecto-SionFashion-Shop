const Usuario = require('../models/usuario'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo usuario
const crearUsuario = async (data) => {
    const nuevoUsuario = new Usuario(data);
    return await nuevoUsuario.save();
};

// Obtener todos los usuarios
const obtenerUsuarios = async () => {
    return await Usuario.find().populate('roles registros_actividades'); // Poblamos las referencias
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (id) => {
    return await Usuario.findById(id).populate('roles registros_actividades');
};

// Actualizar un usuario por ID
const actualizarUsuario = async (id, data) => {
    return await Usuario.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Eliminar un usuario por ID
const eliminarUsuario = async (id) => {
    return await Usuario.findByIdAndDelete(id);
};

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario,
};
