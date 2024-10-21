const HistorialInventario = require('../models/historialInventario');
const historialInventarioLogic = require('../logic/historialInventarioLogic'); // Asegúrate de ajustar la ruta según tu estructura
const historialInventarioSchema = require('../validaciones/historialInventarioValidacion'); // Ajusta la ruta según tu estructura

// Crear un nuevo historial de inventario
exports.crearHistorialInventario = async (req, res) => {
    try {
        // Validar el cuerpo de la solicitud
        const { error } = historialInventarioSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const nuevoHistorial = await historialInventarioLogic.crearHistorialInventario(req.body);
        res.status(201).json(nuevoHistorial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los registros de historial de inventario
exports.obtenerHistorialInventario = async (req, res) => {
    try {
        const historiales = await historialInventarioLogic.obtenerHistorialInventario();
        res.status(200).json(historiales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un historial de inventario por ID
exports.obtenerHistorialInventarioPorId = async (req, res) => {
    try {
        const historial = await historialInventarioLogic.obtenerHistorialInventarioPorId(req.params.id);
        if (!historial) {
            return res.status(404).json({ message: 'Historial de inventario no encontrado' });
        }
        res.status(200).json(historial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un historial de inventario por ID
exports.actualizarHistorialInventario = async (req, res) => {
    try {
        // Validar el cuerpo de la solicitud
        const { error } = historialInventarioSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const historialActualizado = await historialInventarioLogic.actualizarHistorialInventario(req.params.id, req.body);
        if (!historialActualizado) {
            return res.status(404).json({ message: 'Historial de inventario no encontrado' });
        }
        res.status(200).json(historialActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un historial de inventario por ID
exports.eliminarHistorialInventario = async (req, res) => {
    try {
        const historialEliminado = await historialInventarioLogic.eliminarHistorialInventario(req.params.id);
        if (!historialEliminado) {
            return res.status(404).json({ message: 'Historial de inventario no encontrado' });
        }
        res.status(200).json({ message: 'Historial de inventario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
