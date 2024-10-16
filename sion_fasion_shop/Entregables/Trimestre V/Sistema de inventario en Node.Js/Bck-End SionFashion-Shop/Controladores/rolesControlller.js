const Role = require('../models/role'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo rol
exports.crearRole = async (req, res) => {
    try {
        const nuevoRole = new Role(req.body);
        await nuevoRole.save();
        res.status(201).json(nuevoRole);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los roles
exports.obtenerRoles = async (req, res) => {
    try {
        const roles = await Role.find().populate('usuarios'); // Poblamos la referencia
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un rol por ID
exports.obtenerRolePorId = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id).populate('usuarios');
        if (!role) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un rol por ID
exports.actualizarRole = async (req, res) => {
    try {
        const roleActualizado = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!roleActualizado) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.status(200).json(roleActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un rol por ID
exports.eliminarRole = async (req, res) => {
    try {
        const roleEliminado = await Role.findByIdAndDelete(req.params.id);
        if (!roleEliminado) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        res.status(200).json({ message: 'Rol eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
