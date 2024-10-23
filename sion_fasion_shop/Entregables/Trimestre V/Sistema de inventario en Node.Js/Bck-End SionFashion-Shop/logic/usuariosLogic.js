const Usuario = require('../models/usuario');

// Crear un nuevo usuario
const crearUsuario = async (data) => {
    const nuevoUsuario = new Usuario({
        nombre_usuario: data.nombre_usuario,
        email: data.email,
        clave_usuario: data.clave_usuario, // Guardamos la clave en texto plano
        roles: data.roles
    });

    return await nuevoUsuario.save();
};

// Obtener todos los usuarios
const obtenerUsuarios = async () => {
    return await Usuario.find().populate('roles registros_actividades', '-clave_usuario'); // Ocultamos la clave
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (id) => {
    return await Usuario.findById(id).populate('roles registros_actividades', '-clave_usuario'); // Ocultamos la clave
};

// Actualizar un usuario por ID
const actualizarUsuario = async (id, data) => {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
        id,
        {
            nombre_usuario: data.nombre_usuario,
            email: data.email,
            roles: data.roles
            // No se actualiza la clave_usuario si no se proporciona
        },
        { new: true, runValidators: true }
    );

    return usuarioActualizado;
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
