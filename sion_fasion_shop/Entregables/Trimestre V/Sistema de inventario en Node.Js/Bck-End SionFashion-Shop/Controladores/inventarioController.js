const Inventario = require('../models/inventario');
const inventarioLogic = require('../logic/inventarioLogic'); // Asegúrate de ajustar la ruta según tu estructura

// Crear un nuevo registro de inventario
exports.crearInventario = async (req, res) => {
    try {
        const nuevoInventario = await inventarioLogic.crearInventario(req.body);
        res.status(201).json(nuevoInventario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los registros de inventario
exports.obtenerInventarios = async (req, res) => {
    try {
        const inventarios = await inventarioLogic.obtenerInventarios();
        res.status(200).json(inventarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un registro de inventario por ID
exports.obtenerInventarioPorId = async (req, res) => {
    try {
        const inventario = await inventarioLogic.obtenerInventarioPorId(req.params.id);
        if (!inventario) {
            return res.status(404).json({ message: 'Inventario no encontrado' });
        }
        res.status(200).json(inventario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un registro de inventario por ID
exports.actualizarInventario = async (req, res) => {
    try {
        const inventarioActualizado = await inventarioLogic.actualizarInventario(req.params.id, req.body);
        if (!inventarioActualizado) {
            return res.status(404).json({ message: 'Inventario no encontrado' });
        }
        res.status(200).json(inventarioActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un registro de inventario por ID
exports.eliminarInventario = async (req, res) => {
    try {
        const inventarioEliminado = await inventarioLogic.eliminarInventario(req.params.id);
        if (!inventarioEliminado) {
            return res.status(404).json({ message: 'Inventario no encontrado' });
        }
        res.status(200).json({ message: 'Inventario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
