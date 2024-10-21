const Role = require('../models/role'); // Asegúrate de que la ruta sea correcta
const rolesLogic = require('../logic/rolesLogic'); // Ajusta la ruta según tu estructura
const { roleValidationSchema } = require('../validaciones/roleValidacion'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo rol
exports.crearRole = async (req, res) => {
    try {
        // Validar los datos de entrada
        await roleValidationSchema.validateAsync(req.body);
        const nuevoRole = await rolesLogic.crearRole(req.body);
        res.status(201).json(nuevoRole);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el rol', error: error.message });
    }
};

// Obtener todos los roles
exports.obtenerRoles = async (req, res) => {
    try {
        const roles = await rolesLogic.obtenerRoles();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los roles', error: error.message });
    }
};

// Obtener un rol por ID
exports.obtenerRolePorId = async (req, res) => {
    try {
        const role = await rolesLogic.obtenerRolePorId(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el rol', error: error.message });
    }
};

// Actualizar un rol por ID
exports.actualizarRole = async (req, res) => {
    try {
        // Validar los datos de entrada
        await roleValidationSchema.validateAsync(req.body);
        const roleActualizado = await rolesLogic.actualizarRole(req.params.id, req.body);
        if (!roleActualizado) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.status(200).json(roleActualizado);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el rol', error: error.message });
    }
};

// Eliminar un rol por ID
exports.eliminarRole = async (req, res) => {
    try {
        const roleEliminado = await rolesLogic.eliminarRole(req.params.id);
        if (!roleEliminado) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.status(200).json({ message: 'Rol eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el rol', error: error.message });
    }
};
