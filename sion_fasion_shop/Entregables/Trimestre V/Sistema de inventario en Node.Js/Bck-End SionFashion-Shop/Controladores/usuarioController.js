const Usuario = require('../models/usuario'); // Asegúrate de que la ruta sea correcta
const usuariosLogic = require('../logic/usuariosLogic'); // Ajusta la ruta según tu estructura
const { usuarioValidationSchema } = require('../validaciones/usuarioValidacion'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
    try {
        // Validar los datos de entrada
        await usuarioValidationSchema.validateAsync(req.body);
        const nuevoUsuario = await usuariosLogic.crearUsuario(req.body);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el usuario', error: error.message });
    }
};

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuariosLogic.obtenerUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
    }
};

// Obtener un usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await usuariosLogic.obtenerUsuarioPorId(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
    }
};

// Actualizar un usuario por ID
exports.actualizarUsuario = async (req, res) => {
    try {
        // Validar los datos de entrada
        await usuarioValidationSchema.validateAsync(req.body);
        const usuarioActualizado = await usuariosLogic.actualizarUsuario(req.params.id, req.body);
        if (!usuarioActualizado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(usuarioActualizado);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el usuario', error: error.message });
    }
};

// Eliminar un usuario por ID
exports.eliminarUsuario = async (req, res) => {
    try {
        const usuarioEliminado = await usuariosLogic.eliminarUsuario(req.params.id);
        if (!usuarioEliminado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
    }
};
